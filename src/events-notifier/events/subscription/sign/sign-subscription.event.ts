import { GenericEvent, GenericToken, RawEventType } from '@/libs/blockchain/mvx/event-decoder';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { LunarPayEvent } from '@/events-notifier/events/lunar-pay-event';

import { SignSubscriptionEventTopics } from './sign-subscription-event.topics';

export class SignSubscriptionEvent extends GenericEvent implements LunarPayEvent {
  readonly decodedTopics: SignSubscriptionEventTopics;
  readonly emitEventName = BlockchainEventDecoded.SignSubscription;

  readonly address: string;
  readonly token: GenericToken | undefined;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new SignSubscriptionEventTopics(this.topics);

    const topicData = this.getTopics();

    this.address = topicData.address;
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
