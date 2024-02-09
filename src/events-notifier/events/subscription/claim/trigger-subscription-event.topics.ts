import BigNumber from 'bignumber.js';
import { AbiRegistry, Address, List, ResultsParser } from '@multiversx/sdk-core/out';
import { TransactionEvent, TransactionEventTopic } from '@multiversx/sdk-network-providers/out';

import abi from '@/common/protocol/abi/lunarpay.abi.json';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

type ParseResult = {
  subscription_id: BigNumber,
  member: Address,
  cycles: BigNumber,
  amounts: any,
}

export class TriggerSubscriptionEventTopics extends LunarPayEventTopics {
  private readonly subscriptionId: number;
  private readonly member: Address;
  private readonly cycles: number;
  private readonly amounts: any;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const parser = new ResultsParser();
    const abiRegistry = AbiRegistry.create(abi);
    const eventDefinition = abiRegistry.getEvent(this.eventName);

    const event = new TransactionEvent({
      identifier: 'triggerSubscription',
      topics: [
        new TransactionEventTopic(rawTopics[0]),
        new TransactionEventTopic(rawTopics[1]),
        new TransactionEventTopic(rawTopics[2]),
        new TransactionEventTopic(rawTopics[3]),
        new TransactionEventTopic(rawTopics[4]),
      ],
    });

    const bundle = parser.parseEvent(event, eventDefinition) as ParseResult;

    this.subscriptionId = bundle.subscription_id.toNumber();
    this.member = new Address(bundle.member);;
    this.cycles = bundle.amounts.toNumber();
    this.amounts = [];
  }

  toPlainObject() {
    return {
      subscriptionId: this.subscriptionId,
      accounts: this.member,
      cycles: this.cycles,
      amounts: this.amounts,
    };
  }
}
