import BigNumber from 'bignumber.js';
import { AbiRegistry, List, ResultsParser } from '@multiversx/sdk-core/out';
import { TransactionEvent, TransactionEventTopic } from '@multiversx/sdk-network-providers/out';

import abi from '@/common/protocol/abi/lunarpay.abi.json';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

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

    const parser = new ResultsParser();
    const abiRegistry = AbiRegistry.create(abi);
    const eventDefinition = abiRegistry.getEvent(this.eventName);

    const event = new TransactionEvent({
      identifier: 'triggerAgreement',
      topics: [
        new TransactionEventTopic(rawTopics[0]),
        new TransactionEventTopic(rawTopics[1]),
        new TransactionEventTopic(rawTopics[2]),
        new TransactionEventTopic(rawTopics[3]),
        new TransactionEventTopic(rawTopics[4]),
      ],
    });

    const bundle = parser.parseEvent(event, eventDefinition) as ParseResult;

    this.agreementId = bundle.agreement_id.toNumber();
    this.accounts = bundle.accounts.valueOf().map(item => item.toString());
    this.amounts = bundle.amounts.valueOf().map(item => item.toNumber());
    this.cycles = bundle.cycles.valueOf().map(item => item.toNumber());
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
