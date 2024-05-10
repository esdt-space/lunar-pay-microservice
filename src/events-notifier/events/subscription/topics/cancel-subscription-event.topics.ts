import BigNumber from 'bignumber.js';
import { Address } from '@multiversx/sdk-core/out';

import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { LunarPayEventParser } from '@/libs/blockchain/mvx/event-decoder/generic.event-parser';

type ParseResult = {
  id: BigNumber,
  canceled_by: Address,
  member: Address,
  cancelled_at: BigNumber,
}

export class CancelSubscriptionEventTopics extends LunarPayEventTopics {
  private readonly canceledBy: Address;
  private readonly canceledMember: Address;
  private readonly subscriptionId: number;
  private readonly canceledAt: number;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const eventParser = new LunarPayEventParser<ParseResult>();
    const parsedEvent = eventParser.parse(rawTopics, this.eventName);

    this.subscriptionId = parsedEvent.id.toNumber();
    this.canceledMember = new Address(parsedEvent.member);
    this.canceledBy = new Address(parsedEvent.canceled_by);
    this.canceledAt = parsedEvent.cancelled_at.toNumber();
  }

  toPlainObject() {
    return {
      eventName: this.eventName,
      subscriptionId: this.subscriptionId,
      canceledMember: this.canceledMember.bech32(),
      canceledBy: this.canceledBy.bech32(),
      canceledAt: new Date(this.canceledAt * 1000),
    };
  }
}
