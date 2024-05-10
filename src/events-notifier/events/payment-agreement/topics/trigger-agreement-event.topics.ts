import BigNumber from 'bignumber.js';
import { List } from '@multiversx/sdk-core/out';

import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { LunarPayEventParser } from '@/libs/blockchain/mvx/event-decoder/generic.event-parser';

type ParseResult = {
  agreement_id: BigNumber,
  accounts: List,
  cycles: List,
  amounts: List,
}

export class TriggerAgreementEventTopics extends LunarPayEventTopics {
  private readonly agreementId: number;
  private readonly accounts: string[];
  private readonly cycles: number[];
  private readonly amounts: number[];

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const eventParser = new LunarPayEventParser<ParseResult>();
    const parsedEvent = eventParser.parse(rawTopics, this.eventName);

    this.agreementId = parsedEvent.agreement_id.toNumber();
    this.accounts = parsedEvent.accounts.valueOf().map(item => item.toString());
    this.amounts = parsedEvent.amounts.valueOf().map(item => item.toNumber());
    this.cycles = parsedEvent.cycles.valueOf().map(item => item.toNumber());
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
