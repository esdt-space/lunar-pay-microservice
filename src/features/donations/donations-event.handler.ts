import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { TokenOperationService } from '../token-operations/token-operation.service';
import { DonationsService } from './donations.service';
import { TokenOperationType } from '../token-operations/enums';
import { BlockchainEvent } from '@/libs/blockchain/mvx/event-decoder';
import { DonationEventTopics } from '@/events-notifier/events/donation/donation-event.topics';

@Injectable()
export class DonationsEventHandler {
  constructor(
    private readonly tokenOperationsService: TokenOperationService,
    private readonly donationsService: DonationsService,
  ) {}

  @OnEvent(BlockchainEventDecoded.Donation)
  async handlePaymentEvent(event: BlockchainEvent<DonationEventTopics>) {
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
      type: TokenOperationType.DONATION,
      txHash: event.txHash,
      subscription: null,
      details: 'Donation',
      isInternal: false,
      createdAt: new Date(Date.now())
    });
  }
}
