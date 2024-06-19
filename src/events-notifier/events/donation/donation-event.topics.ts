import { Address } from '@multiversx/sdk-core/out';

import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { Token } from '@/libs/blockchain/mvx/models';
import { LunarPayEventParser } from '@/libs/blockchain/mvx/event-decoder/generic.event-parser';

import { DonationParsedResult } from './types';

export class DonationEventTopics extends LunarPayEventTopics {
  private readonly sender: Address;
  private readonly receiver: Address;
  private readonly tokenIdentifier: Token;
  private readonly tokenNonce: number;
  private readonly amount: number;
  private readonly donationId: string;
  private readonly metadata: string;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const eventParser = new LunarPayEventParser<DonationParsedResult>();
    const parsedEvent = eventParser.parse(rawTopics, this.eventName);

    this.sender = new Address(parsedEvent.sender);
    this.receiver = new Address(parsedEvent.receiver);
    this.tokenIdentifier = parsedEvent.token_identifier;
    this.tokenNonce = parsedEvent.token_nonce;
    this.amount = parsedEvent.amount.toNumber();
    this.donationId = parsedEvent.donation_id.toString();
    this.metadata = parsedEvent.metadata !== null ? parsedEvent.metadata.toString() : '';
  }

  toPlainObject() {
    return {
      sender: this.sender,
      receiver: this.receiver,
      tokenIdentifier: this.tokenIdentifier,
      tokenNonce: this.tokenNonce,
      amount: this.amount,
      donationId: this.donationId,
      metadata: this.metadata,
    };
  }
}
