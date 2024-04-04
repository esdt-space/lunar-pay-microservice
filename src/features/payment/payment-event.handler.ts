import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { PaymentEvent } from '@/events-notifier/events';

import { TokenOperationService } from '@/features/token-operations/token-operation.service';
import { TokenOperationType } from '../token-operations/enums';

@Injectable()
export class PaymentEventHandler {
  constructor(
    private readonly tokenOperationsService: TokenOperationService,
  ) {}

  @OnEvent(BlockchainEventDecoded.Payment)
  async handlePaymentEvent(event: PaymentEvent) {
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
