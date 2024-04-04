import BigNumber from 'bignumber.js';
import { AbiRegistry, ResultsParser } from '@multiversx/sdk-core/out';
import { TransactionEvent, TransactionEventTopic } from '@multiversx/sdk-network-providers/out';

import abi from '@/common/protocol/abi/lunarpay.abi.json';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

type ParseResult = {
  id: BigNumber,
  timestamp: BigNumber,
  data: any[],
}

export class TriggerSubscriptionEventTopics extends LunarPayEventTopics {
  private readonly subscriptionId: number;
  private readonly createdAt: number;
  private readonly data: any[];

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const parser = new ResultsParser();
    const abiRegistry = AbiRegistry.create(abi);
    const eventDefinition = abiRegistry.getEvent(this.eventName);

    const event = new TransactionEvent({
      identifier: 'chargeSubscription',
      topics: [
        new TransactionEventTopic(rawTopics[0]),
        new TransactionEventTopic(rawTopics[1]),
        new TransactionEventTopic(rawTopics[2]),
        new TransactionEventTopic(rawTopics[3]),
      ],
    });
    
    const parsedEvent = parser.parseEvent(event, eventDefinition) as ParseResult;

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
