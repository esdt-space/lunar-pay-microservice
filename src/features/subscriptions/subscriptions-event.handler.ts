import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { BlockchainEventDecoded } from '@/events-notifier/enums';

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
import { BlockchainEvent } from '@/libs/blockchain/mvx/event-decoder';
import { CreateSubscriptionEventTopics } from '@/events-notifier/events/subscription/topics/create-subscription-event.topics';
import { SignSubscriptionEventTopics } from '@/events-notifier/events/subscription/topics/sign-subscription-event.topics';
import { TriggerSubscriptionEventTopics } from '@/events-notifier/events/subscription/topics/trigger-subscription-event.topics';
import { CancelSubscriptionEventTopics } from '@/events-notifier/events/subscription/topics/cancel-subscription-event.topics';
import { parseTriggerSubscriptionData } from '@/events-notifier/events/subscription/helpers';

@Injectable()
export class SubscriptionsEventHandler {
  constructor(
    public readonly subscriptionsService: SubscriptionsService,
    public readonly membersService: SubscriptionMembersService,
    private readonly tokenOperationsService: TokenOperationService,
    private readonly subscriptionTriggersService: SubscriptionTriggerService,
  ) {}

  @OnEvent(BlockchainEventDecoded.SignSubscription)
  async handleSubscriptionSignedEvent(event: BlockchainEvent<SignSubscriptionEventTopics>){
    const eventData = event.decodedTopics.toPlainObject();

    const subscription = await this.subscriptionsService
      .findOneByIdSmartContractId(eventData.subscriptionId);

    const dto = {
      member: eventData.address,
      internalSubscriptionId: subscription.id,
      blockchainSubscriptionId: eventData.subscriptionId,

      subscriptionType: subscription.subscriptionType,
      createdAt: eventData.signedAt,
      lastChargedAt: eventData.signedAt,
      lastSuccessfulCharge: eventData.signedAt,
    } as CreateSubscriptionMemberDto;

    await this.subscriptionsService.incrementMembersCount(subscription.id);
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
      subscription: subscription.id,
      details: 'Initial charge',
      isInternal: true,
      createdAt: new Date(Date.now())
    });

    return this.membersService.createMembership(dto);
  }

  @OnEvent(BlockchainEventDecoded.CreateSubscription)
  async handleSubscriptionCreatedEvent(event: BlockchainEvent<CreateSubscriptionEventTopics>) {
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
  async handleTriggerSubscriptionEvent(event: BlockchainEvent<TriggerSubscriptionEventTopics>) {
    const eventData = event.decodedTopics.toPlainObject();

    const chargeAmountResult = parseTriggerSubscriptionData(eventData.data)

    const subscription = await this.subscriptionsService
      .findOneByIdSmartContractId(eventData.subscriptionId);

    const newSubscriptionTrigger = {
      subscription: subscription.id,
      txHash: event.txHash,
      createdAt: new Date()
    }

    const subscriptionTrigger = await this.subscriptionTriggersService.createOrUpdate(newSubscriptionTrigger, chargeAmountResult, event.txHash)

    const providerOperation = await this.tokenOperationsService.create({
      sender: null,
      senderAccountsCount: eventData.data.length,
      receiver: subscription.owner,
      subscriptionTriggerId: null,
      status: TokenOperationStatus.SUCCESS,
      amount: chargeAmountResult.successfulChargeAmount,
      tokenIdentifier: subscription.tokenIdentifier,
      tokenNonce: subscription.tokenNonce,
      type: TokenOperationType.SUBSCRIPTION_CHARGE,
      txHash: event.txHash,
      subscription: subscription.id,
      parentId: null,
      details: 'Recurring Charge',
      isInternal: true,
      createdAt: new Date(Date.now())
    })
  
    eventData.data.forEach((member) => {
      const successfulValue = member.data['field0'];
      const failedValue = member.data['field1'];
      const memberAddress = member.account.toString()

      if(successfulValue !== null) {
        this.membersService.updateLastChargedAt(memberAddress, new Date()) 
        this.tokenOperationsService.create({
          sender: memberAddress,
          senderAccountsCount: null,
          receiver: null,
          subscriptionTriggerId: subscriptionTrigger.id,
          status: TokenOperationStatus.SUCCESS,
          amount: successfulValue['field0'].toString(),
          tokenIdentifier: subscription.tokenIdentifier,
          tokenNonce: subscription.tokenNonce,
          type: TokenOperationType.SUBSCRIPTION_CHARGE,
          txHash: event.txHash,
          subscription: subscription.id,
          parentId: providerOperation.id,
          details: 'Recurring Charge',
          isInternal: true,
          createdAt: new Date(Date.now())
        })
      }

      if(failedValue !== null) {
        this.membersService.updateLastChargedAt(memberAddress, new Date()) 
        this.tokenOperationsService.create({
          sender: memberAddress,
          senderAccountsCount: null,
          receiver: null,
          subscriptionTriggerId: subscriptionTrigger.id,
          status: TokenOperationStatus.FAILED,
          amount: failedValue['field1'].toString(),
          tokenIdentifier: subscription.tokenIdentifier,
          tokenNonce: subscription.tokenNonce,
          type: TokenOperationType.SUBSCRIPTION_CHARGE,
          txHash: event.txHash,
          subscription: subscription.id,
          parentId: providerOperation.id,
          details: 'Recurring Charge',
          isInternal: true,
          createdAt: new Date(Date.now())
        })
      }
    })
  }

  @OnEvent(BlockchainEventDecoded.CancelSubscription)
  async handleSubscriptionCanceledEvent(event: BlockchainEvent<CancelSubscriptionEventTopics>){
    const eventData = event.decodedTopics.toPlainObject();

    const subscription = await this.subscriptionsService
      .findOneByIdSmartContractId(eventData.subscriptionId);

    await this.subscriptionsService.decrementMembersCount(subscription.id);

    await this.membersService.deleteMembership(subscription.id, eventData.canceledMember)
  }
}
