import { GenericEvent, RawEventType } from '@/libs/blockchain/mvx/event-decoder';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { LunarPayEvent } from '@/events-notifier/events/lunar-pay-event';

import { TriggerSubscriptionEventTopics } from './trigger-subscription-event.topics';

export class TriggerSubscriptionEvent extends GenericEvent implements LunarPayEvent {
  readonly decodedTopics: TriggerSubscriptionEventTopics;
  readonly emitEventName = BlockchainEventDecoded.TriggerSubscription;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new TriggerSubscriptionEventTopics(this.topics);
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
