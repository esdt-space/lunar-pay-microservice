import BigNumber from 'bignumber.js';
import { AbiRegistry, Address, ResultsParser } from '@multiversx/sdk-core/out';
import { TransactionEvent, TransactionEventTopic } from '@multiversx/sdk-network-providers/out';

import abi from '@/common/protocol/abi/lunarpay.abi.json';
import { GenericToken } from '@/libs/blockchain/mvx/event-decoder';
import { LunarPayEventTopics } from '../../lunar-pay-event.topics';
import { DepositWithdrawParseEvent } from '../types';

export class DepositWithdrawEventTopics extends LunarPayEventTopics {
  private readonly address: Address;
  private readonly tokenIdentifier: string;
  private readonly tokenNonce: string | number;
  private readonly amount: string;

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
      ],
    });

    const parsedEvent = parser.parseEvent(event, eventDefinition) as DepositWithdrawParseEvent

    this.address = new Address(parsedEvent.address);
    this.tokenIdentifier = parsedEvent.token_identifier.toString();
    this.tokenNonce = parsedEvent.token_nonce.toNumber();
    this.amount = parsedEvent.amount.toString();
  }

  toPlainObject() {
    return {
      eventName: this.eventName,
      address: this.address.bech32(),
      token: new GenericToken({
        tokenIdentifier: this.tokenIdentifier,
        nonce: new BigNumber(this.tokenNonce),
        amount: new BigNumber(this.amount),
      }),
    };
  }
}
