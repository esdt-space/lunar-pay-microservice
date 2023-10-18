import { BlockchainEventDecoded } from '@/events-notifier/enums';

export interface LunarPayEvent {
  emitEventName: BlockchainEventDecoded;
}
