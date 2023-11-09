import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

export class TriggerAgreementEventTopics extends LunarPayEventTopics {
  private readonly agreementId: number;
  private readonly accounts: string[];
  private readonly cycles: number[];
  private readonly amounts: number[];

  constructor(rawTopics: string[]) {
    super(rawTopics);

    this.agreementId = this.parseIntValue(rawTopics[1]);
    this.accounts = Buffer.from(rawTopics[2], 'base64').toString().split(',')
    this.amounts = Buffer.from(rawTopics[3], 'base64').toString().split(',').map((item) => Number(item))
    this.cycles = Buffer.from(rawTopics[4], 'base64').toString().split(',').map((item) => Number(item))
  }

  toPlainObject() {
    return {
      agreementId: this.agreementId,
      accounts: this.accounts,
      cycles: this.cycles,
      amounts: this.amounts,
    };
  }
}
