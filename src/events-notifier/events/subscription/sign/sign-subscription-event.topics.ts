import BigNumber from 'bignumber.js';
import { AbiRegistry, Address, ResultsParser } from '@multiversx/sdk-core/out';
import { TransactionEvent, TransactionEventTopic } from '@multiversx/sdk-network-providers/out';

import abi from '@/common/protocol/abi/lunarpay.abi.json';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

type ParseResult = {
  id: BigNumber,
  member: Address,
  created_at: BigNumber,
}

export class SignSubscriptionEventTopics extends LunarPayEventTopics {
  private readonly address: Address;
  private readonly subscriptionId: number;
  private readonly signedAt: number;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const parser = new ResultsParser();
    const abiRegistry = AbiRegistry.create(abi);
    const eventDefinition = abiRegistry.getEvent(this.eventName);

    const event = new TransactionEvent({
      identifier: 'signSubscription',
      topics: [
        new TransactionEventTopic(rawTopics[0]),
        new TransactionEventTopic(rawTopics[1]),
        new TransactionEventTopic(rawTopics[2]),
        new TransactionEventTopic(rawTopics[3]),
        new TransactionEventTopic(rawTopics[4]),
      ],
    });

    const parsedEvent = parser.parseEvent(event, eventDefinition) as ParseResult;

    this.subscriptionId = parsedEvent.id.toNumber();
    this.address = new Address(parsedEvent.member);
    this.signedAt = parsedEvent.created_at.toNumber();
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
