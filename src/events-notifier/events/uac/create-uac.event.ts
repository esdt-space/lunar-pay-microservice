import {
  GenericEvent,
  RawEventType,
} from '@/libs/blockchain/mvx/event-decoder';

import { CreateUacEventTopics } from './create-uac-event.topics';

export class CreateUacEvent extends GenericEvent {
  readonly decodedTopics: CreateUacEventTopics;

  readonly address: string;
  readonly uac: number;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new CreateUacEventTopics(this.topics);

    const topicData = this.getTopics();

    this.uac = topicData.uac;
    this.address = topicData.address;
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
