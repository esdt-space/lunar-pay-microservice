import { Address } from '@multiversx/sdk-core/out';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

export class SignSubscriptionEventTopics extends LunarPayEventTopics {
  private readonly address: Address;
  private readonly subscriptionId: number;
  private readonly signedAt: number;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    this.subscriptionId = this.parseIntValue(rawTopics[1]);
    this.address = new Address(Buffer.from(rawTopics[2], 'base64'));
    this.signedAt = this.parseIntValue(rawTopics[3]);
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
