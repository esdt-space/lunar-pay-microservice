import {
  GenericEvent,
  GenericToken,
  RawEventType,
} from '@/libs/blockchain/mvx/event-decoder';

import { LunarPayEvent } from '../../lunar-pay-event';
import { BlockchainEventDecoded } from '../../../enums';
import { WithdrawEventTopics } from './withdraw-event.topics';

export class WithdrawEvent extends GenericEvent implements LunarPayEvent {
  readonly decodedTopics: WithdrawEventTopics;
  readonly emitEventName = BlockchainEventDecoded.BlockchainWithdrawEventDecoded;

  readonly address: string;
  readonly token: GenericToken | undefined;

  constructor(init: RawEventType) {
    super(init);
    Object.assign(this, init);

    this.decodedTopics = new WithdrawEventTopics(this.topics);

    const topicData = this.getTopics();

    this.token = topicData.token;
    this.address = topicData.address;
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
