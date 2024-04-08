import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { BlockchainEventDecoded } from '@/events-notifier/enums';

import { CreateAgreementDto } from './dto/create-agreement.dto';
import { PaymentAgreementsService } from './payment-agreements.service';
import {
  blockchainAgreementAmountTypeToApiType,
  blockchainAgreementTypeToApiType,
} from '@/features/payment-agreements/transformers';
import { PaymentAgreementMembersService } from './payment-agreement-members.service';
import { TokenOperationService } from '@/features/token-operations/token-operation.service';
import { TokenOperationStatus, TokenOperationType } from '@/features/token-operations/enums';
import { AgreementTriggerService } from '@/features/agreement-triggers/agreement-triggers.service';
import { UpdateAgreementTriggerDto } from '../agreement-triggers/dto';
import { EventType } from '@/application-events/enums/event-type.enum';
import { SubscriptionChargeCreatedEventPayload } from '@/application-events/enums/types/subscription-charge-created-payload.type';
import { TriggerEvent } from '@/libs/blockchain/mvx/event-decoder';
import { CreatePaymentAgreementEventTopics } from '@/events-notifier/events/payment-agreement/topics/create-payment-agreement-event.topics';
import { SignPaymentAgreementEventTopics } from '@/events-notifier/events/payment-agreement/topics/sign-payment-agreement-event.topics';
import { TriggerAgreementEventTopics } from '@/events-notifier/events/payment-agreement/topics/trigger-agreement-event.topics';

@Injectable()
export class PaymentAgreementsEventHandler {
  constructor(
    public readonly agreementsService: PaymentAgreementsService,
    public readonly membersService: PaymentAgreementMembersService,
    private readonly tokenOperationsService: TokenOperationService,
    private readonly agreementTriggersService: AgreementTriggerService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent(BlockchainEventDecoded.SignPaymentAgreement)
  async handlePaymentAgreementSignedEvent(event: TriggerEvent<SignPaymentAgreementEventTopics>){
    const eventData = event.decodedTopics.toPlainObject();

    const agreement = await this.agreementsService
      .findOneByIdSmartContractId(eventData.agreementId);

    const dto = {
      member: eventData.address,
      internalAgreementId: agreement.id,
      blockchainAgreementId: eventData.agreementId,

      createdAt: eventData.signedAt,
      agreementType: agreement.agreementType,
    } as any;

    await this.agreementsService.incrementMembersCount(agreement.id);
    await this.tokenOperationsService.create({
      sender: eventData.address,
      senderAccountsCount: null,
      receiver: agreement.owner,
      subscriptionTriggerId: null,
      amount: agreement.fixedAmount,
      tokenIdentifier: agreement.tokenIdentifier,
      tokenNonce: agreement.tokenNonce,
      type: TokenOperationType.SUBSCRIPTION_CHARGE,
      txHash: event.txHash,
      subscription: agreement.id,
      details: 'Initial charge',
      isInternal: true,
      createdAt: new Date(Date.now())
    });

    const membership = await this.membersService.createMembership(dto);

    this.eventEmitter.emit(EventType.SubscriptionMembershipCreated, {
      agreement, membership
    });
  }

  @OnEvent(BlockchainEventDecoded.BlockchainCreatePaymentAgreementEventDecoded)
  async handlePaymentAgreementCreatedEvent(event: TriggerEvent<CreatePaymentAgreementEventTopics>) {
    const eventData = event.decodedTopics.toPlainObject();

    const dto = {
      owner: eventData.address,
      agreementIdentifier: eventData.agreementId,

      tokenNonce: eventData.token.nonce.toNumber(),
      tokenIdentifier: eventData.token.tokenIdentifier,

      agreementType: blockchainAgreementTypeToApiType(eventData.agreementType),
      amountType: blockchainAgreementAmountTypeToApiType(eventData.amountType),
      frequency: eventData.frequency,
      fixedAmount: eventData.fixedAmount,
      minimumAmount: eventData.minimumAmount,
      maximumAmount: eventData.maximumAmount,

      createdAt: new Date(eventData.timeCreated * 1000),
    } as CreateAgreementDto;

    const agreement = await this.agreementsService.create(dto);

    this.eventEmitter.emit(EventType.SubscriptionCreated, { agreement });
  }

  @OnEvent(BlockchainEventDecoded.TriggerPaymentAgreement)
  async handleTriggerAgreementEvent(payload: TriggerEvent<TriggerAgreementEventTopics>) {
    const eventData = payload.decodedTopics.toPlainObject();

    const totalAmount = eventData.amounts.reduce((acc, val) => acc + val, 0).toString();

    const agreement = await this.agreementsService
      .findOneByIdSmartContractId(eventData.agreementId);

    const newAgreementTrigger = {
      agreement: agreement.id,
      txHash: payload.txHash,
      createdAt: new Date()
    }

    const updateTriggerData = new UpdateAgreementTriggerDto();

    if(payload.name === "failedAgreementCharges") {
      // eventData.accounts.forEach((el, index) => {
      //   const lastSuccessfulCharge = calculateLastSuccessfulCharge(index, agreement.frequency, eventData)
      //   this.membersService.updateLastChargedAt(el, lastSuccessfulCharge)
      // })

      updateTriggerData.failedChargeAmount = totalAmount;
      updateTriggerData.failedAccountsCount = eventData.accounts.length;
    } else if(payload.name === 'successfulAgreementCharges') {
      updateTriggerData.successfulChargeAmount = totalAmount;
      updateTriggerData.successfulAccountsCount = eventData.accounts.length;
    }

    const memberInformation = eventData.accounts.map((address, index) => {
      return ({
        address: address,
        cycles: eventData.cycles[index],
      });
    });
    
    const agreementTrigger = await this.agreementTriggersService.createOrUpdate(newAgreementTrigger, updateTriggerData, payload.txHash);

    this.eventEmitter.emit(EventType.SubscriptionChargeCreated, { agreement, agreementTrigger, totalAmount, blockchainEvent: payload, memberInformation });
  }

  @OnEvent(EventType.SubscriptionChargeCreated)
  async createSubscriptionChargeTokenOperations(payload: SubscriptionChargeCreatedEventPayload) {
    const {
      memberInformation,
      agreement,
      agreementTrigger,
      blockchainEvent,
      totalAmount
    } = payload;

    const eventData = blockchainEvent.decodedTopics.toPlainObject();

    if(blockchainEvent.name === 'successfulAgreementCharges') {
      const providerOperation = await this.tokenOperationsService.create({
        sender: null,
        senderAccountsCount: eventData.data.length,
        receiver: agreement.owner,
        subscriptionTriggerId: null,
        status: TokenOperationStatus.SUCCESS,
        amount: totalAmount,
        tokenIdentifier: agreement.tokenIdentifier,
        tokenNonce: agreement.tokenNonce,
        type: TokenOperationType.SUBSCRIPTION_CHARGE,
        txHash: blockchainEvent.txHash,
        subscription: agreement.id,
        parentId: null,
        details: 'Recurring Charge',
        isInternal: true,
        createdAt: new Date(Date.now())
      })
  
      eventData.data.forEach((el, index) => {
        this.membersService.updateLastChargedAt(el.account, new Date()) 
        this.tokenOperationsService.create({
          sender: el.account,
          senderAccountsCount: null,
          receiver: null,
          subscriptionTriggerId: agreementTrigger.id,
          status: TokenOperationStatus.SUCCESS,
          amount: totalAmount,
          tokenIdentifier: agreement.tokenIdentifier,
          tokenNonce: agreement.tokenNonce,
          type: TokenOperationType.SUBSCRIPTION_CHARGE,
          txHash: blockchainEvent.txHash,
          subscription: agreement.id,
          parentId: providerOperation.id,
          details: 'Recurring Charge',
          isInternal: true,
          createdAt: new Date(Date.now())
        })
      })
    }
  }
}
