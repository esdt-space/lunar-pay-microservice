import BigNumber from 'bignumber.js';
import { AbiRegistry, Address, ResultsParser } from '@multiversx/sdk-core/out';
import { TransactionEvent, TransactionEventTopic } from '@multiversx/sdk-network-providers/out';

import abi from '@/common/protocol/abi/lunarpay.abi.json';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

type ParseResult = {
  agreement_id: BigNumber,
  member: Address,
  signed_at: BigNumber,
}

export class SignPaymentAgreementEventTopics extends LunarPayEventTopics {
  private readonly address: Address;
  private readonly agreementId: number;
  private readonly signedAt: number;
  private readonly metadata: string;

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const parser = new ResultsParser();
    const abiRegistry = AbiRegistry.create(abi);
    const eventDefinition = abiRegistry.getEvent(this.eventName);

    const event = new TransactionEvent({
      identifier: 'signPaymentAgreement',
      topics: [
        new TransactionEventTopic(rawTopics[0]),
        new TransactionEventTopic(rawTopics[1]),
        new TransactionEventTopic(rawTopics[2]),
        new TransactionEventTopic(rawTopics[3]),
        new TransactionEventTopic(rawTopics[4]),
      ],
    });

    const bundle = parser.parseEvent(event, eventDefinition) as ParseResult;

    this.agreementId = bundle.agreement_id.toNumber();
    this.address = new Address(bundle.member);
    this.signedAt = bundle.signed_at.toNumber();
    this.metadata = Buffer.from(rawTopics[4], 'base64').toString();
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
