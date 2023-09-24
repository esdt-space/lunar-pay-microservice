import {
  GenericEvent,
  GenericToken,
  RawEventType,
} from '@/libs/blockchain/mvx/event-decoder';

import { DepositEventTopics } from './deposit-event.topics';

export class DepositEvent extends GenericEvent {
  readonly decodedTopics: DepositEventTopics;

  readonly address: string;
  readonly token: GenericToken | undefined;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new DepositEventTopics(this.topics);

    const topicData = this.getTopics();

    this.token = topicData.token;
    this.address = topicData.address;
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
