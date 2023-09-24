import BigNumber from 'bignumber.js';
import { Address } from '@multiversx/sdk-core/out';

import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { GenericToken } from '@/libs/blockchain/mvx/event-decoder';

export class DepositEventTopics extends LunarPayEventTopics {
  private readonly address: Address;
  private readonly tokenIdentifier: string;
  private readonly tokenNonce: string;
  private readonly amount: number;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    this.address = new Address(Buffer.from(rawTopics[1], 'base64'));
    this.tokenIdentifier = Buffer.from(rawTopics[2], 'base64').toString();
    this.tokenNonce = Buffer.from(rawTopics[2], 'base64').toString();

    this.amount = parseInt(
      Buffer.from(rawTopics[3], 'base64').toString('hex'),
      16,
    );
  }

  toPlainObject() {
    return {
      eventName: this.eventName,
      address: this.address.bech32(),
      token: new GenericToken({
        tokenID: this.tokenIdentifier,
        nonce: new BigNumber(this.tokenNonce),
        amount: new BigNumber(this.amount),
      }),
    };
  }
}
