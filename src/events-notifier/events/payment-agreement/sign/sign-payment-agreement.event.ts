import { GenericEvent, GenericToken, RawEventType } from '@/libs/blockchain/mvx/event-decoder';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { LunarPayEvent } from '@/events-notifier/events/lunar-pay-event';

import { SignPaymentAgreementEventTopics } from './sign-payment-agreement-event.topics';

export class SignPaymentAgreementEvent extends GenericEvent implements LunarPayEvent {
  readonly decodedTopics: SignPaymentAgreementEventTopics;
  readonly emitEventName = BlockchainEventDecoded.SignPaymentAgreement;

  readonly address: string;
  readonly token: GenericToken | undefined;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new SignPaymentAgreementEventTopics(this.topics);

    const topicData = this.getTopics();

    this.address = topicData.address;
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
