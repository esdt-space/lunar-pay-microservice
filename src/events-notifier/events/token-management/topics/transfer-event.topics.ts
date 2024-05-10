import BigNumber from 'bignumber.js';
import { Address } from '@multiversx/sdk-core/out';

import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { GenericToken } from '@/libs/blockchain/mvx/event-decoder';
import { TransferParsedEvent } from '../types';
import { LunarPayEventParser } from '@/libs/blockchain/mvx/event-decoder/generic.event-parser';

export class TransferEventTopics extends LunarPayEventTopics {
  private readonly sender: Address;
  private readonly receiver: Address;
  private readonly tokenIdentifier: string;
  private readonly tokenNonce: string | number;
  private readonly amount: string;
  private readonly isInternal: boolean;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const eventParser = new LunarPayEventParser<TransferParsedEvent>();
    const parsedEvent = eventParser.parse(rawTopics, this.eventName);

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
