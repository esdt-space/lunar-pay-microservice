import BigNumber from 'bignumber.js';
import { AbiRegistry, Address, OptionValue, ResultsParser } from '@multiversx/sdk-core/out';
import { TransactionEvent, TransactionEventTopic } from '@multiversx/sdk-network-providers/out';

import abi from '@/common/protocol/abi/lunarpay.abi.json';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';

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

    const parser = new ResultsParser();
    const abiRegistry = AbiRegistry.create(abi);
    const eventDefinition = abiRegistry.getEvent(this.eventName);

    const eventIdentifier = 'signPaymentAgreement';

    const event = new TransactionEvent({
      identifier: eventIdentifier,
      topics: [
        new TransactionEventTopic(rawTopics[0]),
        new TransactionEventTopic(rawTopics[1]),
        new TransactionEventTopic(rawTopics[2]),
        new TransactionEventTopic(rawTopics[3]),
        new TransactionEventTopic(rawTopics[4]),
      ],
    });

    const parsedEvent = parser.parseEvent(event, eventDefinition) as ParseResult;

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
