import { GenericEvent, RawEventType } from '@/libs/blockchain/mvx/event-decoder';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { LunarPayEvent } from '@/events-notifier/events/lunar-pay-event';

import { TriggerAgreementEventTopics } from './trigger-agreement-event.topics';

export class TriggerAgreementEvent extends GenericEvent implements LunarPayEvent {
  readonly decodedTopics: TriggerAgreementEventTopics;
  readonly emitEventName = BlockchainEventDecoded.TriggerPaymentAgreement;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new TriggerAgreementEventTopics(this.topics);
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
