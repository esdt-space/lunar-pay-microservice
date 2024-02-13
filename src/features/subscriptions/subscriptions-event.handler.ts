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

    const chargesAmountResult = eventData.data.reduce((acc, val) => {
      if(val.data.successful !== null) {
        acc.successfulChargeAmount = Number(val.data.successful[1])
        acc.successfulAccountsCount++
      }

      if(val.data.failed !== null) {
        acc.failedChargeAmount = Number(val.data.failed[1])
        acc.failedAccountsCount++
      }

      return acc
    }, {
      successfulChargeAmount: 0, 
      failedChargeAmount: 0, 
      successfulAccountsCount: 0, 
      failedAccountsCount: 0
    })

    const subscription = await this.subscriptionsService
      .findOneByIdSmartContractId(eventData.subscriptionId);

    const newSubscriptionTrigger = {
      subscription: subscription._id,
      txHash: event.txHash
    }

    const subscriptionTrigger = await this.subscriptionTriggersService.createOrUpdate(newSubscriptionTrigger, chargesAmountResult, event.txHash)

    const providerOperation = await this.tokenOperationsService.create({
      sender: null,
      senderAccountsCount: eventData.data.length,
      receiver: subscription.owner,
      subscriptionTriggerId: null,
      status: TokenOperationStatus.SUCCESS,
      amount: chargesAmountResult.successfulChargeAmount,
      tokenIdentifier: subscription.tokenIdentifier,
      tokenNonce: subscription.tokenNonce,
      type: TokenOperationType.SUBSCRIPTION_CHARGE,
      txHash: event.txHash,
      subscription: subscription._id,
      parentId: null,
      details: 'Recurring Charge',
      isInternal: true,
    })
  
    eventData.data.forEach((member) => {
      if(member.data.successful !== null) {
        this.membersService.updateLastChargedAt(member.account, new Date()) 
        this.tokenOperationsService.create({
          sender: member.account,
          senderAccountsCount: null,
          receiver: null,
          subscriptionTriggerId: subscriptionTrigger._id,
          status: TokenOperationStatus.SUCCESS,
          amount: member.data.successful[0],
          tokenIdentifier: subscription.tokenIdentifier,
          tokenNonce: subscription.tokenNonce,
          type: TokenOperationType.SUBSCRIPTION_CHARGE,
          txHash: event.txHash,
          subscription: subscription._id,
          parentId: providerOperation._id,
          details: 'Recurring Charge',
          isInternal: true,
        })
      }

      if(member.data.failed !== null) {
        this.membersService.updateLastChargedAt(member.account, new Date()) 
        this.tokenOperationsService.create({
          sender: member.account,
          senderAccountsCount: null,
          receiver: null,
          subscriptionTriggerId: subscriptionTrigger._id,
          status: TokenOperationStatus.FAILED,
          amount: member.data.failed[0],
          tokenIdentifier: subscription.tokenIdentifier,
          tokenNonce: subscription.tokenNonce,
          type: TokenOperationType.SUBSCRIPTION_CHARGE,
          txHash: event.txHash,
          subscription: subscription._id,
          parentId: providerOperation._id,
          details: 'Recurring Charge',
          isInternal: true,
        })
      }
    })
  }
}
