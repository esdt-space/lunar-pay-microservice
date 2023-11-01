import { GenericEvent, RawEventType } from '@/libs/blockchain/mvx/event-decoder';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { LunarPayEvent } from '@/events-notifier/events/lunar-pay-event';

import { ClaimTotalAmountSuccessEventTopics } from './claim-total-amount-success-event.topics';

export class ClaimTotalAmountFailedEvent extends GenericEvent implements LunarPayEvent {
  readonly decodedTopics: ClaimTotalAmountSuccessEventTopics;
  readonly emitEventName = BlockchainEventDecoded.TriggerPaymentAgreement;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new ClaimTotalAmountSuccessEventTopics(this.topics);
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}