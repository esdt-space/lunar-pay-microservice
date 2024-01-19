import { Address } from '@multiversx/sdk-core/out';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

export class SignPaymentAgreementEventTopics extends LunarPayEventTopics {
  private readonly address: Address;
  private readonly agreementId: number;
  private readonly signedAt: number;
  private readonly metadata: string;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    this.agreementId = this.parseIntValue(rawTopics[1]);
    this.address = new Address(Buffer.from(rawTopics[2], 'base64'));
    this.signedAt = this.parseIntValue(rawTopics[3]);
    this.metadata = 'metadata';
  }

  toPlainObject() {
    return {
      agreementId: this.agreementId,
      address: this.address.bech32(),
      signedAt: new Date(this.signedAt * 1000),
      metadata: this.metadata,
      eventName: this.eventName,
    };
  }
}
