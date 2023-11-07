import { Address } from '@multiversx/sdk-core/out';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { GenericToken } from '@/libs/blockchain/mvx/event-decoder';
import BigNumber from 'bignumber.js';

export class ClaimTotalAmountSuccessEventTopics extends LunarPayEventTopics {
  private readonly address: Address;
  private readonly tokenNonce: number;
  private readonly tokenIdentifier: string;

  private readonly agreementId: number;
  private readonly claimedAt: number;

  private readonly accounts: string[];
  private readonly cycles: string[];
  private readonly amounts: number[];

  constructor(rawTopics: string[]) {
    console.log("raw topics", rawTopics)
    super(rawTopics);

    this.agreementId = this.parseIntValue(rawTopics[1]);
    this.accounts = rawTopics.slice(2).map((topic) => Buffer.from(topic, 'base64').toString());
    this.amounts = rawTopics.slice(3).map((topic) => this.parseBigUintValue(topic));
    this.cycles = rawTopics.slice(4).map((topic) => Buffer.from(topic, 'base64').toString());

    this.address = new Address(Buffer.from(rawTopics[5], 'base64'));
    this.tokenNonce = this.parseIntValue(rawTopics[6]);
    this.tokenIdentifier = Buffer.from(rawTopics[7], 'base64').toString();
    
    this.claimedAt = this.parseIntValue(rawTopics[8]);
  }

  toPlainObject() {
    return {
      address: this.address.bech32(),
      eventName: this.eventName,
      agreementId: this.agreementId,
      claimedAt: new Date(this.claimedAt * 1000),
      accounts: this.accounts,
      cycles: this.cycles,
      amounts: this.amounts,
      token: new GenericToken({
        tokenIdentifier: this.tokenIdentifier,
        nonce: new BigNumber(this.tokenNonce),
      }),
    };
  }
}
