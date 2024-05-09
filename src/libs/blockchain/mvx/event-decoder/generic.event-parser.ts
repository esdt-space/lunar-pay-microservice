import { AbiRegistry, ResultsParser } from '@multiversx/sdk-core/out';
import { TransactionEvent, TransactionEventTopic } from '@multiversx/sdk-network-providers/out';

import abi from '@/common/protocol/abi/lunarpay.abi.json';

export class LunarPayEventParser<T> {
  private parser: ResultsParser;
  private abiRegistry: AbiRegistry;

  constructor() {
    this.parser = new ResultsParser();
    this.abiRegistry = AbiRegistry.create(abi);
  }

  parse(rawTopics: string[], eventName: string): T {
    const eventDefinition = this.abiRegistry.getEvent(eventName);

    const event = new TransactionEvent({
      identifier: eventDefinition.identifier,
      topics: rawTopics.map(item => new TransactionEventTopic(item)),
    });

    return this.parser.parseEvent(event, eventDefinition) as T;
  }
}
