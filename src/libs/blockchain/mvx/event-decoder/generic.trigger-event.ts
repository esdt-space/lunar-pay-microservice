import { LunarPayEvent } from "@/events-notifier/events/lunar-pay-event";
import { GenericEvent, GenericParsedEventType, RawEventType } from ".";
import { BlockchainEventDecoded } from "@/events-notifier/enums";

export interface Decodable {
  toPlainObject(): GenericParsedEventType;
}

export class TriggerEvent<T extends Decodable> extends GenericEvent implements LunarPayEvent {
  readonly decodedTopics: T;
  readonly emitEventName: BlockchainEventDecoded;

  constructor(init: RawEventType, emitEventName: BlockchainEventDecoded, TopicsConstructor: new (topics: string[]) => T) {
    super(init);
    Object.assign(this, init);
    this.decodedTopics = new TopicsConstructor(this.topics);
    this.emitEventName = emitEventName;
  }

  getTopics() {
    return this.decodedTopics.toPlainObject();
  }
}
