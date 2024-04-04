import { GenericEvent, RawEventType } from '@/libs/blockchain/mvx/event-decoder';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { LunarPayEvent } from '@/events-notifier/events/lunar-pay-event';

import { DonationEventTopics } from './donation-event.topics';

export class DonationEvent extends GenericEvent implements LunarPayEvent {
  readonly decodedTopics: DonationEventTopics;
  readonly emitEventName = BlockchainEventDecoded.Donation;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new DonationEventTopics(this.topics);
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
