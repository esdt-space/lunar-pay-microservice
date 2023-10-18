import BigNumber from 'bignumber.js';
import { Address } from '@multiversx/sdk-core/out';

import { GenericToken } from '@/libs/blockchain/mvx/event-decoder';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

export class CreatePaymentAgreementEventTopics extends LunarPayEventTopics {
  private readonly agreementId: number;
  private readonly frequency: number;
  private readonly unixTimestamp: number;
  private readonly agreementType: number;
  private readonly amountType: number;

  private readonly address: Address;
  private readonly tokenNonce: number;
  private readonly tokenIdentifier: string;

  private readonly fixedAmount: string | undefined;
  private readonly minimumAmount: string | undefined;
  private readonly maximumAmount: string | undefined;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    this.agreementId = this.parseIntValue(rawTopics[1]);
    this.address = new Address(Buffer.from(rawTopics[2], 'base64'));
    this.tokenNonce = this.parseIntValue(rawTopics[3]);
    this.tokenIdentifier = Buffer.from(rawTopics[4], 'base64').toString();
    this.frequency = this.parseIntValue(rawTopics[5]);
    this.unixTimestamp = this.parseIntValue(rawTopics[6]);
    this.agreementType = this.parseIntValue(rawTopics[7]);
    this.amountType = this.parseIntValue(rawTopics[8]);
    this.fixedAmount = this.parseBigUintValue(rawTopics[9], undefined);

    if (!this.fixedAmount) {
      this.minimumAmount = this.parseBigUintValue(rawTopics[10], undefined);
      this.maximumAmount = this.parseBigUintValue(rawTopics[11], undefined);
    }
  }

  toPlainObject() {
    return {
      eventName: this.eventName,
      agreementId: this.agreementId,
      address: this.address.bech32(),
      frequency: this.frequency,
      timeCreated: this.unixTimestamp,
      agreementType: this.agreementType,
      amountType: this.amountType,
      fixedAmount: this.fixedAmount,
      minimumAmount: this.minimumAmount,
      maximumAmount: this.maximumAmount,
      token: new GenericToken({
        tokenIdentifier: this.tokenIdentifier,
        nonce: new BigNumber(this.tokenNonce),
      }),
    };
  }
}
