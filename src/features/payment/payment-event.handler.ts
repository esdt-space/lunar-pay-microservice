import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { BlockchainEventDecoded } from '@/events-notifier/enums';

import { TokenOperationService } from '@/features/token-operations/token-operation.service';
import { TokenOperationType } from '../token-operations/enums';
import { TriggerEvent } from '@/libs/blockchain/mvx/event-decoder';
import { PaymentEventTopics } from '@/events-notifier/events/payment/payment-event.topics';

@Injectable()
export class PaymentEventHandler {
  constructor(
    private readonly tokenOperationsService: TokenOperationService,
  ) {}

  @OnEvent(BlockchainEventDecoded.Payment)
  async handlePaymentEvent(event: TriggerEvent<PaymentEventTopics>) {
    const eventData = event.decodedTopics.toPlainObject();

    await this.tokenOperationsService.create({
      sender: eventData.sender.toString(),
      senderAccountsCount: null,
      receiver: eventData.receiver.toString(),
      subscriptionTriggerId: null,
      amount: eventData.amount.toString(),
      tokenIdentifier: eventData.tokenIdentifier.toString(),
      tokenNonce: Number(eventData.tokenNonce),
      type: TokenOperationType.PAYMENT,
      txHash: event.txHash,
      subscription: null,
      details: 'Payment',
      isInternal: false,
      createdAt: new Date(Date.now())
    });
  }
}
