import { GenericEvent, RawEventType } from '@/libs/blockchain/mvx/event-decoder';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { LunarPayEvent } from '@/events-notifier/events/lunar-pay-event';

import { PaymentEventTopics } from './payment-event.topics';

export class PaymentEvent extends GenericEvent implements LunarPayEvent {
  readonly decodedTopics: PaymentEventTopics;
  readonly emitEventName = BlockchainEventDecoded.Payment;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new PaymentEventTopics(this.topics);
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
