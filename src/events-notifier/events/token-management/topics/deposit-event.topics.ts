import BigNumber from 'bignumber.js';
import { Address } from '@multiversx/sdk-core/out';

import { GenericToken } from '@/libs/blockchain/mvx/event-decoder';
import { LunarPayEventTopics } from '../../lunar-pay-event.topics';

export class DepositEventTopics extends LunarPayEventTopics {
  private readonly address: Address;
  private readonly tokenIdentifier: string;
  private readonly tokenNonce: string | number;
  private readonly amount: number;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    this.address = new Address(Buffer.from(rawTopics[1], 'base64'));
    this.tokenIdentifier = Buffer.from(rawTopics[2], 'base64').toString();
    this.tokenNonce = this.parseIntValue(rawTopics[3]);
    this.amount = this.parseIntValue(rawTopics[4]);
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
