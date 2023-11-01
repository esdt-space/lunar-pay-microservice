import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

export class ClaimTotalAmountSuccessEventTopics extends LunarPayEventTopics {
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
  }

  toPlainObject() {
    return {
      eventName: this.eventName,
      agreementId: this.agreementId,
      claimedAt: new Date(this.claimedAt * 1000),
      accounts: this.accounts,
      cycles: this.cycles,
      amounts: this.amounts,
    };
  }
}
