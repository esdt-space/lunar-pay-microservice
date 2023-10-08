import {
  GenericEvent,
  GenericToken,
  RawEventType,
} from '@/libs/blockchain/mvx/event-decoder';

import { TransferEventTopics } from './transfer-event.topics';

export class TransferEvent extends GenericEvent {
  readonly decodedTopics: TransferEventTopics;

  readonly sender: string;
  readonly receiver: string;
  readonly token: GenericToken | undefined;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new TransferEventTopics(this.topics);

    const topicData = this.getTopics();

    this.token = topicData.token;
    this.sender = topicData.sender;
    this.receiver = topicData.receiver;
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
