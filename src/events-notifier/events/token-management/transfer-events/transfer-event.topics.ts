import BigNumber from 'bignumber.js';
import { Address } from '@multiversx/sdk-core/out';

import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { GenericToken } from '@/libs/blockchain/mvx/event-decoder';

export class TransferEventTopics extends LunarPayEventTopics {
  private readonly sender: Address;
  private readonly receiver: Address;
  private readonly tokenIdentifier: string;
  private readonly tokenNonce: string;
  private readonly amount: number;
  private readonly isInternal: boolean;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    this.sender = new Address(Buffer.from(rawTopics[1], 'base64'));
    this.receiver = new Address(Buffer.from(rawTopics[2], 'base64'));
    this.tokenIdentifier = Buffer.from(rawTopics[3], 'base64').toString();
    this.tokenNonce = Buffer.from(rawTopics[4], 'base64').toString();
    this.amount = parseInt(
      Buffer.from(rawTopics[5], 'base64').toString('hex'),
      16,
    );
    this.isInternal = Buffer.from(rawTopics[6], 'base64').toString() === 'true';
  }

  toPlainObject() {
    return {
      eventName: this.eventName,
      sender: this.sender.bech32(),
      receiver: this.receiver.bech32(),
      isInternal: this.isInternal,
      token: new GenericToken({
        tokenID: this.tokenIdentifier,
        nonce: new BigNumber(this.tokenNonce),
        amount: new BigNumber(this.amount),
      }),
    };
  }
}
