import { Address } from '@multiversx/sdk-core/out';

import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { LunarPayEventParser } from '@/libs/blockchain/mvx/event-decoder/generic.event-parser';
import { SignSubscriptionParsedEvent } from '..';

export class SignSubscriptionEventTopics extends LunarPayEventTopics {
  private readonly address: Address;
  private readonly subscriptionId: number;
  private readonly signedAt: number;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const eventParser = new LunarPayEventParser<SignSubscriptionParsedEvent>();
    const parsedEvent = eventParser.parse(rawTopics, this.eventName);

    this.subscriptionId = parsedEvent.id.toNumber();
    this.address = new Address(parsedEvent.member);
    this.signedAt = parsedEvent.created_at.toNumber();
  }

  toPlainObject() {
    return {
      eventName: this.eventName,
      subscriptionId: this.subscriptionId,
      address: this.address.bech32(),
      signedAt: new Date(this.signedAt * 1000),
    };
  }
}
