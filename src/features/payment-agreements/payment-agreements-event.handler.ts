import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { CreatePaymentAgreementEvent, SignPaymentAgreementEvent, TriggerAgreementEvent } from '@/events-notifier/events';

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
import { calculateLastSuccessfulCharge } from '@/utils/time/last-successful-charge';

@Injectable()
export class PaymentAgreementsEventHandler {
  constructor(
    public readonly agreementsService: PaymentAgreementsService,
    public readonly membersService: PaymentAgreementMembersService,
    private readonly tokenOperationsService: TokenOperationService,
    private readonly agreementTriggersService: AgreementTriggerService,
  ) {}

  @OnEvent(BlockchainEventDecoded.SignPaymentAgreement)
  async handlePaymentAgreementSignedEvent(event: SignPaymentAgreementEvent){
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

    return this.membersService.createMembership(dto);
  }

  @OnEvent(BlockchainEventDecoded.BlockchainCreatePaymentAgreementEventDecoded)
  async handlePaymentAgreementCreatedEvent(event: CreatePaymentAgreementEvent) {
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

    return this.agreementsService.create(dto);
  }

  @OnEvent(BlockchainEventDecoded.TriggerPaymentAgreement)
  async handleTriggerAgreementEvent(event: TriggerAgreementEvent) {
    const eventData = event.decodedTopics.toPlainObject();

    const totalAmount = eventData.amounts.reduce((acc, val) => acc + val, 0).toString()

    const agreement = await this.agreementsService
      .findOneByIdSmartContractId(eventData.agreementId);

    const memberAmount = (index: number) => {
      const result = Number(eventData.cycles[index]) * Number(agreement.fixedAmount)

      return result.toString()
    }

    const newAgreementTrigger = {
      agreement: agreement.id,
      txHash: event.txHash
    }

    const updateTriggerData = new UpdateAgreementTriggerDto()

    if(event.name === "failedAgreementCharges") {
      // eventData.accounts.forEach((el, index) => {
      //   const lastSuccessfulCharge = calculateLastSuccessfulCharge(index, agreement.frequency, eventData)
      //   this.membersService.updateLastChargedAt(el, lastSuccessfulCharge)
      // })

      updateTriggerData.failedChargeAmount = totalAmount
      updateTriggerData.failedAccountsCount = eventData.accounts.length
    } else if(event.name === "successfulAgreementCharges") {
      updateTriggerData.successfulChargeAmount = totalAmount
      updateTriggerData.successfulAccountsCount = eventData.accounts.length
    }
    
    const agreementTrigger = await this.agreementTriggersService.createOrUpdate(newAgreementTrigger, updateTriggerData, event.txHash)

    if(event.name === "successfulAgreementCharges") {
      const providerOperation = await this.tokenOperationsService.create({
        sender: null,
        senderAccountsCount: eventData.accounts.length,
        receiver: agreement.owner,
        subscriptionTriggerId: null,
        status: TokenOperationStatus.SUCCESS,
        amount: totalAmount,
        tokenIdentifier: agreement.tokenIdentifier,
        tokenNonce: agreement.tokenNonce,
        type: TokenOperationType.SUBSCRIPTION_CHARGE,
        txHash: event.txHash,
        subscription: agreement.id,
        parentId: null,
        details: 'Recurring Charge',
        isInternal: true,
        createdAt: new Date(Date.now())
      })
  
      eventData.accounts.forEach((el, index) => {
        this.membersService.updateLastChargedAt(el, new Date()) 
        this.tokenOperationsService.create({
          sender: el,
          senderAccountsCount: null,
          receiver: null,
          subscriptionTriggerId: agreementTrigger.id,
          status: TokenOperationStatus.SUCCESS,
          amount: memberAmount(index),
          tokenIdentifier: agreement.tokenIdentifier,
          tokenNonce: agreement.tokenNonce,
          type: TokenOperationType.SUBSCRIPTION_CHARGE,
          txHash: event.txHash,
          subscription: agreement.id,
          parentId: providerOperation[0].id,
          details: 'Recurring Charge',
          isInternal: true,
          createdAt: new Date(Date.now())
        })
      })
    }
  }
}
