import BigNumber from 'bignumber.js';
import { AbiRegistry, Address, ResultsParser } from '@multiversx/sdk-core/out';
import { TransactionEvent, TransactionEventTopic } from '@multiversx/sdk-network-providers/out';

import abi from '@/common/protocol/abi/lunarpay.abi.json';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { GenericToken } from '@/libs/blockchain/mvx/event-decoder';
import { TransferParseEvent } from '../types';

export class TransferEventTopics extends LunarPayEventTopics {
  private readonly sender: Address;
  private readonly receiver: Address;
  private readonly tokenIdentifier: string;
  private readonly tokenNonce: string | number;
  private readonly amount: string;
  private readonly isInternal: boolean;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const parser = new ResultsParser();
    const abiRegistry = AbiRegistry.create(abi);
    const eventDefinition = abiRegistry.getEvent(this.eventName);

    const event = new TransactionEvent({
      identifier: this.eventName,
      topics: [
        new TransactionEventTopic(rawTopics[0]),
        new TransactionEventTopic(rawTopics[1]),
        new TransactionEventTopic(rawTopics[2]),
        new TransactionEventTopic(rawTopics[3]),
        new TransactionEventTopic(rawTopics[4]),
        new TransactionEventTopic(rawTopics[5]),
        new TransactionEventTopic(rawTopics[6]),
        new TransactionEventTopic(rawTopics[7]),
      ],
    });

    const parsedEvent = parser.parseEvent(event, eventDefinition) as TransferParseEvent;

    this.sender = new Address(parsedEvent.sender);
    this.receiver = new Address(parsedEvent.receiver);
    this.tokenIdentifier = parsedEvent.token_identifier.toString();
    this.tokenNonce = parsedEvent.token_nonce.toNumber();
    this.amount = parsedEvent.amount.toString();
    this.isInternal = parsedEvent.is_internal;
  }

  toPlainObject() {
    return {
      eventName: this.eventName,
      sender: this.sender.bech32(),
      receiver: this.receiver.bech32(),
      isInternal: this.isInternal,
      token: new GenericToken({
        tokenIdentifier: this.tokenIdentifier,
        nonce: new BigNumber(this.tokenNonce),
        amount: new BigNumber(this.amount),
      }),
    };
  }
}
