import { Address } from '@multiversx/sdk-core/out';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

export class ClaimTotalAmountFailedEventTopics extends LunarPayEventTopics {
  private readonly address: Address;
  private readonly agreementId: number;
  private readonly claimedAt: number;

  private readonly accounts: string[];
  private readonly cycles: string[];
  private readonly amounts: number[];

  constructor(rawTopics: string[]) {
    super(rawTopics);

    this.agreementId = this.parseIntValue(rawTopics[1]);
    this.claimedAt = this.parseIntValue(rawTopics[2]);

    this.accounts = rawTopics.slice(3).map((topic) => Buffer.from(topic, 'base64').toString());
    this.cycles = rawTopics.slice(4).map((topic) => Buffer.from(topic, 'base64').toString());
    this.amounts = rawTopics.slice(5).map((topic) => this.parseBigUintValue(topic));

    this.address = new Address(Buffer.from(rawTopics[6], 'base64'));
  }

  toPlainObject() {
    return {
      address: this.address.bech32(),
      eventName: this.eventName,
      agreementId: this.agreementId,
      claimedAt: new Date(this.claimedAt * 1000),
      accounts: this.accounts,
      cycles: this.cycles,
      amounts: this.amounts,
    };
  }
}
