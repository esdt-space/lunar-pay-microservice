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
import { CreateAgreementMemberDto } from './dto/create-agreement-member.dto';
import { PaymentAgreementMembersService } from './payment-agreement-members.service';
import { TokenOperationService } from '@/features/token-operations/token-operation.service';
import { TokenOperationStatus, TokenOperationType } from '@/features/token-operations/enums';

@Injectable()
export class PaymentAgreementsEventHandler {
  constructor(
    public readonly agreementsService: PaymentAgreementsService,
    public readonly membersService: PaymentAgreementMembersService,
    private readonly tokenOperationsService: TokenOperationService,
  ) {}

  @OnEvent(BlockchainEventDecoded.SignPaymentAgreement)
  async handlePaymentAgreementSignedEvent(event: SignPaymentAgreementEvent){
    const eventData = event.decodedTopics.toPlainObject();

    const agreement = await this.agreementsService
      .findOneByIdSmartContractId(eventData.agreementId);

    const dto = {
      member: eventData.address,
      internalAgreementId: agreement._id,
      blockchainAgreementId: eventData.agreementId,

      createdAt: eventData.signedAt,
      agreementType: agreement.agreementType,
    } as CreateAgreementMemberDto;

    await this.agreementsService.incrementMembersCount(agreement._id);
    await this.tokenOperationsService.create({
      sender: eventData.address,
      receiver: agreement.owner,
      amount: agreement.fixedAmount,
      tokenIdentifier: agreement.tokenIdentifier,
      tokenNonce: agreement.tokenNonce,
      type: TokenOperationType.PAYMENT_AGREEMENT_CHARGE,
      txHash: event.txHash,
      agreement: agreement._id,
      details: 'Initial charge',
      isInternal: true
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

    const agreement = await this.agreementsService
      .findOneByIdSmartContractId(eventData.agreementId);

    const memberAmount = (index: number) => {
      const result = Number(eventData.cycles[index]) * Number(agreement.fixedAmount)

      return result.toString()
    }

    this.membersService.updateLastChargedAt(agreement._id)

    if(event.name === "successfulAgreementCharges") {
      const providerOperation = await this.tokenOperationsService.create({
        sender: null,
        receiver: agreement.owner,
        status: TokenOperationStatus.SUCCESS,
        amount: eventData.amounts.reduce((acc, val) => acc + val, 0).toString(),
        tokenIdentifier: agreement.tokenIdentifier,
        tokenNonce: agreement.tokenNonce,
        type: TokenOperationType.PAYMENT_AGREEMENT_CHARGE,
        txHash: event.txHash,
        agreement: agreement._id,
        parentId: null,
        details: 'Recurring Charge',
        isInternal: true,
      })
  
      eventData.accounts.forEach((el, index) => {
        this.tokenOperationsService.create({
          sender: el,
          receiver: null,
          status: TokenOperationStatus.SUCCESS,
          amount: memberAmount(index),
          tokenIdentifier: agreement.tokenIdentifier,
          tokenNonce: agreement.tokenNonce,
          type: TokenOperationType.PAYMENT_AGREEMENT_CHARGE,
          txHash: event.txHash,
          agreement: agreement._id,
          parentId: providerOperation._id,
          details: 'Recurring Charge',
          isInternal: true,
        })
      })
    }
  }
}
