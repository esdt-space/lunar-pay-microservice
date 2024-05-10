import BigNumber from 'bignumber.js';
import { Address, OptionValue } from '@multiversx/sdk-core/out';

import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { LunarPayEventParser } from '@/libs/blockchain/mvx/event-decoder/generic.event-parser';

type ParseResult = {
  agreement_id: BigNumber,
  member: Address,
  signed_at: BigNumber,
  metadata: OptionValue,
}

export class SignPaymentAgreementEventTopics extends LunarPayEventTopics {
  private readonly address: Address;
  private readonly agreementId: number;
  private readonly signedAt: number;
  private readonly metadata: string;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const eventParser = new LunarPayEventParser<ParseResult>();
    const parsedEvent = eventParser.parse(rawTopics, this.eventName);

    this.agreementId = parsedEvent.agreement_id.toNumber();
    this.address = new Address(parsedEvent.member);
    this.signedAt = parsedEvent.signed_at.toNumber();
    this.metadata = parsedEvent.metadata.toString();
  }

  toPlainObject() {
    return {
      agreementId: this.agreementId,
      address: this.address.bech32(),
      signedAt: new Date(this.signedAt * 1000),
      metadata: this.metadata,
      eventName: this.eventName,
    };
  }
}
