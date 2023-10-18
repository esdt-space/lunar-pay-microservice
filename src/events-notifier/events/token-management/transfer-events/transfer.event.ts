import {
  GenericEvent,
  GenericToken,
  RawEventType,
} from '@/libs/blockchain/mvx/event-decoder';

import { LunarPayEvent } from '../../lunar-pay-event';
import { BlockchainEventDecoded } from '../../../enums';
import { TransferEventTopics } from './transfer-event.topics';

export class TransferEvent extends GenericEvent implements LunarPayEvent {
  readonly decodedTopics: TransferEventTopics;
  readonly emitEventName = BlockchainEventDecoded.BlockchainTokenTransferEventDecoded;

  readonly sender: string;
  readonly receiver: string;
  readonly isInternal: boolean;
  readonly token: GenericToken | undefined;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new TransferEventTopics(this.topics);

    const topicData = this.getTopics();

    this.token = topicData.token;
    this.sender = topicData.sender;
    this.receiver = topicData.receiver;
    this.isInternal = topicData.isInternal;
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
