import { Address } from '@multiversx/sdk-core/out';

import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

export class CreateUacEventTopics extends LunarPayEventTopics {
  private readonly address: Address;
  private readonly uac: number;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    this.address = new Address(Buffer.from(rawTopics[1], 'base64'));
    this.uac = parseInt(
      Buffer.from(rawTopics[3], 'base64').toString('hex'),
      16,
    );
  }

  toPlainObject() {
    return {
      eventName: this.eventName,
      address: this.address.bech32(),
      uac: this.uac,
    };
  }
}
