import { GenericEvent, GenericToken, RawEventType } from '@/libs/blockchain/mvx/event-decoder';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { LunarPayEvent } from '@/events-notifier/events/lunar-pay-event';

import { CreatePaymentAgreementEventTopics } from './create-payment-agreement-event.topics';

export class CreatePaymentAgreementEvent extends GenericEvent implements LunarPayEvent {
  readonly decodedTopics: CreatePaymentAgreementEventTopics;
  readonly emitEventName = BlockchainEventDecoded.BlockchainCreatePaymentAgreementEventDecoded;

  readonly address: string;
  readonly token: GenericToken | undefined;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new CreatePaymentAgreementEventTopics(this.topics);

    const topicData = this.getTopics();

    this.token = topicData.token;
    this.address = topicData.address;
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
