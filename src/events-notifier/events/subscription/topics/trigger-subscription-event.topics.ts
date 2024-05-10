import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { SubscriptionMultiChargeResult, TriggerSubscriptionParsedEvent } from '..';
import { LunarPayEventParser } from '@/libs/blockchain/mvx/event-decoder/generic.event-parser';

export class TriggerSubscriptionEventTopics extends LunarPayEventTopics {
  private readonly subscriptionId: number;
  private readonly createdAt: number;
  private readonly data: SubscriptionMultiChargeResult[];

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const eventParser = new LunarPayEventParser<TriggerSubscriptionParsedEvent>();
    const parsedEvent = eventParser.parse(rawTopics, this.eventName);

    this.subscriptionId = parsedEvent.id.toNumber();
    this.createdAt = parsedEvent.timestamp.toNumber();
    this.data = parsedEvent.data;
  }

  toPlainObject() {
    return {
      subscriptionId: this.subscriptionId,
      createdAt: this.createdAt,
      data: this.data,
    };
  }
}
