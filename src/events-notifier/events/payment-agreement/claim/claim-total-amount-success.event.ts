import { GenericEvent, GenericToken, RawEventType } from '@/libs/blockchain/mvx/event-decoder';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { LunarPayEvent } from '@/events-notifier/events/lunar-pay-event';

import { ClaimTotalAmountSuccessEventTopics } from './claim-total-amount-success-event.topics';

export class ClaimTotalAmountSuccessEvent extends GenericEvent implements LunarPayEvent {
  readonly decodedTopics: ClaimTotalAmountSuccessEventTopics;
  readonly emitEventName = BlockchainEventDecoded.TriggerPaymentAgreement;

  readonly address: string;
  readonly token: GenericToken | undefined;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new ClaimTotalAmountSuccessEventTopics(this.topics);

    const topicData = this.getTopics();

    this.token = topicData.token;
    this.address = topicData.address;
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
