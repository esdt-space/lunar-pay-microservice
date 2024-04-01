import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { PaymentEvent } from '@/events-notifier/events';

import { TokenOperationService } from '@/features/token-operations/token-operation.service';
import { TokenOperationType } from '../token-operations/enums';
import { DonationsService } from '../donations/donations.service';

@Injectable()
export class PaymentEventHandler {
  constructor(
    private readonly tokenOperationsService: TokenOperationService,
    private readonly donationsService: DonationsService,
  ) {}

  @OnEvent(BlockchainEventDecoded.Payment)
  async handlePaymentEvent(event: PaymentEvent) {
    const eventData = event.decodedTopics.toPlainObject();

    const donation = await this.donationsService.findOneDonationByAccount(eventData.receiver.toString())

    await this.tokenOperationsService.create({
      parentId: donation.id,
      sender: eventData.sender.toString(),
      senderAccountsCount: null,
      receiver: eventData.receiver.toString(),
      subscriptionTriggerId: null,
      amount: eventData.amount.toString(),
      tokenIdentifier: eventData.tokenIdentifier.toString(),
      tokenNonce: Number(eventData.tokenNonce),
      type: TokenOperationType.DONATION, // TODO: Change afeter the donation SC implementation
      txHash: event.txHash,
      subscription: null,
      details: 'Donation',
      isInternal: false,
      createdAt: new Date(Date.now())
    });
  }
}
