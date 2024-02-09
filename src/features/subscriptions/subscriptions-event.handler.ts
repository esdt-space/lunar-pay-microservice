import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { CreateSubscriptionEvent, SignSubscriptionEvent, TriggerSubscriptionEvent } from '@/events-notifier/events';

import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionsService } from './subscriptions.service';
import {
  blockchainSubscriptionAmountTypeToApiType,
  blockchainSubscriptionTypeToApiType,
} from '@/features/subscriptions/transformers';
import { CreateSubscriptionMemberDto } from './dto/create-subscription-member.dto';
import { SubscriptionMembersService } from './subscription-members.service';
import { TokenOperationService } from '@/features/token-operations/token-operation.service';
import { TokenOperationStatus, TokenOperationType } from '@/features/token-operations/enums';
import { SubscriptionTriggerService } from '@/features/subscription-triggers/subscription-triggers.service';
import { UpdateSubscriptionTriggerDto } from '../subscription-triggers/dto';
import { calculateLastSuccessfulCharge } from '@/utils/time/last-successful-charge';

@Injectable()
export class SubscriptionsEventHandler {
  constructor(
    public readonly subscriptionsService: SubscriptionsService,
    public readonly membersService: SubscriptionMembersService,
    private readonly tokenOperationsService: TokenOperationService,
    private readonly subscriptionTriggersService: SubscriptionTriggerService,
  ) {}

  @OnEvent(BlockchainEventDecoded.SignSubscription)
  async handleSubscriptionSignedEvent(event: SignSubscriptionEvent){
    const eventData = event.decodedTopics.toPlainObject();

    const subscription = await this.subscriptionsService
      .findOneByIdSmartContractId(eventData.subscriptionId);

    const dto = {
      member: eventData.address,
      internalSubscriptionId: subscription._id,
      blockchainSubscriptionId: eventData.subscriptionId,

      createdAt: eventData.signedAt,
      subscriptionType: subscription.subscriptionType,
    } as CreateSubscriptionMemberDto;

    await this.subscriptionsService.incrementMembersCount(subscription._id);
    await this.tokenOperationsService.create({
      sender: eventData.address,
      senderAccountsCount: null,
      receiver: subscription.owner,
      subscriptionTriggerId: null,
      amount: subscription.fixedAmount,
      tokenIdentifier: subscription.tokenIdentifier,
      tokenNonce: subscription.tokenNonce,
      type: TokenOperationType.SUBSCRIPTION_CHARGE,
      txHash: event.txHash,
      subscription: subscription._id,
      details: 'Initial charge',
      isInternal: true
    });

    return this.membersService.createMembership(dto);
  }

  @OnEvent(BlockchainEventDecoded.CreateSubscription)
  async handleSubscriptionCreatedEvent(event: CreateSubscriptionEvent) {
    const eventData = event.decodedTopics.toPlainObject();

    const dto = {
      owner: eventData.address,
      subscriptionIdentifier: eventData.subscriptionId,

      tokenNonce: eventData.token.nonce.toNumber(),
      tokenIdentifier: eventData.token.tokenIdentifier,

      subscriptionType: blockchainSubscriptionTypeToApiType(eventData.subscriptionType),
      amountType: blockchainSubscriptionAmountTypeToApiType(eventData.amountType),
      frequency: eventData.frequency,
      fixedAmount: eventData.fixedAmount,

      createdAt: new Date(eventData.timeCreated * 1000),
    } as CreateSubscriptionDto;

    return this.subscriptionsService.create(dto);
  }

  @OnEvent(BlockchainEventDecoded.TriggerSubscription)
  async handleTriggerSubscriptionEvent(event: TriggerSubscriptionEvent) {
    const eventData = event.decodedTopics.toPlainObject();

    const totalAmount = eventData.amounts.reduce((acc, val) => acc + val, 0).toString()

    const subscription = await this.subscriptionsService
      .findOneByIdSmartContractId(eventData.subscriptionId);

    const memberAmount = (index: number) => {
      const result = Number(eventData.cycles[index]) * Number(subscription.fixedAmount)

      return result.toString()
    }

    const newSubscriptionTrigger = {
      subscription: subscription._id,
      txHash: event.txHash
    }

    const updateTriggerData = new UpdateSubscriptionTriggerDto()

    // if(event.name === "failedSubscriptionCharges") {
    //   eventData.accounts.forEach((el, index) => {
    //     const lastSuccessfulCharge = calculateLastSuccessfulCharge(index, subscription.frequency, eventData)
    //     this.membersService.updateLastChargedAt(el, lastSuccessfulCharge)
    //   })

    //   updateTriggerData.failedChargeAmount = totalAmount
    //   updateTriggerData.failedAccountsCount = eventData.accounts.length
    // } else if(event.name === "successfulSubscriptionCharges") {
    //   updateTriggerData.successfulChargeAmount = totalAmount
    //   updateTriggerData.successfulAccountsCount = eventData.accounts.length
    // }
    
    // const subscriptionTrigger = await this.subscriptionTriggersService.createOrUpdate(newSubscriptionTrigger, updateTriggerData, event.txHash)

    // if(event.name === "successfulSubscriptionCharges") {
    //   const providerOperation = await this.tokenOperationsService.create({
    //     sender: null,
    //     senderAccountsCount: eventData.accounts.length,
    //     receiver: subscription.owner,
    //     subscriptionTriggerId: null,
    //     status: TokenOperationStatus.SUCCESS,
    //     amount: totalAmount,
    //     tokenIdentifier: subscription.tokenIdentifier,
    //     tokenNonce: subscription.tokenNonce,
    //     type: TokenOperationType.SUBSCRIPTION_CHARGE,
    //     txHash: event.txHash,
    //     subscription: subscription._id,
    //     parentId: null,
    //     details: 'Recurring Charge',
    //     isInternal: true,
    //   })
  
    //   eventData.accounts.forEach((el, index) => {
    //     this.membersService.updateLastChargedAt(el, new Date()) 
    //     this.tokenOperationsService.create({
    //       sender: el,
    //       senderAccountsCount: null,
    //       receiver: null,
    //       subscriptionTriggerId: subscriptionTrigger._id,
    //       status: TokenOperationStatus.SUCCESS,
    //       amount: memberAmount(index),
    //       tokenIdentifier: subscription.tokenIdentifier,
    //       tokenNonce: subscription.tokenNonce,
    //       type: TokenOperationType.SUBSCRIPTION_CHARGE,
    //       txHash: event.txHash,
    //       subscription: subscription._id,
    //       parentId: providerOperation._id,
    //       details: 'Recurring Charge',
    //       isInternal: true,
    //     })
    //   })
    // }
  }
}
