import BigNumber from 'bignumber.js';
import { Address } from '@multiversx/sdk-core/out';

import { GenericToken } from '@/libs/blockchain/mvx/event-decoder';
import { LunarPayEventTopics } from '../../lunar-pay-event.topics';
import { LunarPayEventParser } from '@/libs/blockchain/mvx/event-decoder/generic.event-parser';
import { DepositWithdrawParsedEvent } from '../types';

export class DepositWithdrawEventTopics extends LunarPayEventTopics {
  private readonly address: Address;
  private readonly tokenIdentifier: string;
  private readonly tokenNonce: string | number;
  private readonly amount: string;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const eventParser = new LunarPayEventParser<DepositWithdrawParsedEvent>();
    const parsedEvent = eventParser.parse(rawTopics, this.eventName);

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
