import BigNumber from 'bignumber.js';
import { AbiRegistry, Address, ResultsParser } from '@multiversx/sdk-core/out';
import { TransactionEvent, TransactionEventTopic } from '@multiversx/sdk-network-providers/out';

import abi from '@/common/protocol/abi/lunarpay.abi.json';
import { GenericToken } from '@/libs/blockchain/mvx/event-decoder';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

type ParseResult = {
  id: BigNumber,
  owner: Address,
  token_nonce: BigNumber,
  token_identifier: string,
  frequency: BigNumber,
  time_created: BigNumber,
  subscription_type: number,
  amount_type: number,
  amount: string,
}

export class CreateSubscriptionEventTopics extends LunarPayEventTopics {
  private readonly subscriptionId: number;
  private readonly frequency: number;
  private readonly unixTimestamp: number;
  private readonly subscriptionType: number;
  private readonly amountType: number;

  private readonly address: Address;
  private readonly tokenNonce: number;
  private readonly tokenIdentifier: string;

  private readonly fixedAmount: string | undefined;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const parser = new ResultsParser();
    const abiRegistry = AbiRegistry.create(abi);
    const eventDefinition = abiRegistry.getEvent(this.eventName);

    const event = new TransactionEvent({
      identifier: 'createSubscription',
      topics: [
        new TransactionEventTopic(rawTopics[0]),
        new TransactionEventTopic(rawTopics[1]),
        new TransactionEventTopic(rawTopics[2]),
        new TransactionEventTopic(rawTopics[3]),
        new TransactionEventTopic(rawTopics[4]),
        new TransactionEventTopic(rawTopics[5]),
        new TransactionEventTopic(rawTopics[6]),
        new TransactionEventTopic(rawTopics[7]),
        new TransactionEventTopic(rawTopics[8]),
        new TransactionEventTopic(rawTopics[9]),
      ],
    });

    const parsedEvent = parser.parseEvent(event, eventDefinition) as ParseResult;

    this.subscriptionId = parsedEvent.id.toNumber();
    this.address = new Address(parsedEvent.owner);
    this.tokenNonce = parsedEvent.token_nonce.toNumber();
    this.tokenIdentifier = parsedEvent.token_identifier.toString();
    this.frequency = parsedEvent.frequency.toNumber();
    this.unixTimestamp = parsedEvent.time_created.toNumber();
    this.subscriptionType = parsedEvent.subscription_type;
    this.amountType = parsedEvent.amount_type;
    this.fixedAmount = parsedEvent.amount.toString();
  }

  toPlainObject() {
    return {
      eventName: this.eventName,
      subscriptionId: this.subscriptionId,
      address: this.address.bech32(),
      frequency: this.frequency,
      timeCreated: this.unixTimestamp,
      subscriptionType: this.subscriptionType,
      amountType: this.amountType,
      fixedAmount: this.fixedAmount,
      token: new GenericToken({
        tokenIdentifier: this.tokenIdentifier,
        nonce: new BigNumber(this.tokenNonce),
      }),
    };
  }
}
