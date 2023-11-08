import { GenericEvent, GenericToken, RawEventType } from '@/libs/blockchain/mvx/event-decoder';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { LunarPayEvent } from '@/events-notifier/events/lunar-pay-event';

import { TriggerAgreementEventTopics } from './claim-total-amount-success-event.topics';

export class TriggerAgreementEvent extends GenericEvent implements LunarPayEvent {
  readonly decodedTopics: TriggerAgreementEventTopics;
  readonly emitEventName = BlockchainEventDecoded.TriggerPaymentAgreement;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    console.log('this topics',this.topics)
    this.decodedTopics = new TriggerAgreementEventTopics(this.topics);
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
