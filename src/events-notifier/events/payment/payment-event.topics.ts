import BigNumber from 'bignumber.js';
import { AbiRegistry, Address, OptionValue, ResultsParser } from '@multiversx/sdk-core/out';
import { TransactionEvent, TransactionEventTopic } from '@multiversx/sdk-network-providers/out';

import abi from '@/common/protocol/abi/lunarpay.abi.json';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { Token } from '@/libs/blockchain/mvx/models';

type ParseResult = {
  sender: Address,
  receiver: Address,
  token_identifier: Token,
  token_nonce: number,
  amount: BigNumber,
  metadata: OptionValue,
}

export class PaymentEventTopics extends LunarPayEventTopics {
  private readonly sender: Address;
  private readonly receiver: Address;
  private readonly tokenIdentifier: Token;
  private readonly tokenNonce: number;
  private readonly amount: number;
  private readonly metadata: string;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const parser = new ResultsParser();
    const abiRegistry = AbiRegistry.create(abi);
    const eventDefinition = abiRegistry.getEvent(this.eventName);

    const event = new TransactionEvent({
      identifier: 'payment',
      topics: [
        new TransactionEventTopic(rawTopics[0]),
        new TransactionEventTopic(rawTopics[1]),
        new TransactionEventTopic(rawTopics[2]),
        new TransactionEventTopic(rawTopics[3]),
        new TransactionEventTopic(rawTopics[4]),
        new TransactionEventTopic(rawTopics[5]),
        new TransactionEventTopic(rawTopics[6]),
      ],
    });

    const parsedEvent = parser.parseEvent(event, eventDefinition) as ParseResult;

    this.sender = new Address(parsedEvent.sender);
    this.receiver = new Address(parsedEvent.receiver);
    this.tokenIdentifier = parsedEvent.token_identifier;
    this.tokenNonce = parsedEvent.token_nonce;
    this.amount = parsedEvent.amount.toNumber();
    this.metadata = parsedEvent.metadata.toString();
  }

  toPlainObject() {
    return {
      sender: this.sender,
      receiver: this.receiver,
      tokenIdentifier: this.tokenIdentifier,
      tokenNonce: this.tokenNonce,
      amount: this.amount,
      metadata: this.metadata,
    };
  }
}