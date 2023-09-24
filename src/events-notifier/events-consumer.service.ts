import { Injectable, Logger } from '@nestjs/common';

import { GenericEvent, RawEvent } from '@/libs/blockchain/mvx/event-decoder';
import { CompetingRabbitConsumer } from '@/libs/blockchain/mvx/events-notifier';

import { UacEventsHandler } from '@/features/uac';
import { DepositEvent, WithdrawEvent } from '@/events-notifier/events';

@Injectable()
export class EventsConsumerService {
  private readonly logger = new Logger(EventsConsumerService.name);

  constructor(private readonly uacEventsHandler: UacEventsHandler) {}

  @CompetingRabbitConsumer({
    queueName: 'events-59fc754',
  })
  consumeEvents(rawEvents: any) {
    try {
      const events: any[] = rawEvents?.events ?? [];
      // for (const rawEvent of events) {
      //   const decodedEvent = this.decodeEvent(rawEvent);
      //   console.log(decodedEvent);
      // }
    } catch (error) {
      this.logger.error(
        `An unhandled error occurred when consuming events: ${JSON.stringify(
          rawEvents,
        )}`,
      );
      this.logger.error(error);
    }
  }

  private decodeEvent(rawEvent: RawEvent) {
    switch (rawEvent.name) {
      case 'deposit':
        return new DepositEvent(rawEvent);
      case 'withdraw':
        return new WithdrawEvent(rawEvent);
      default:
        return new GenericEvent(rawEvent);
    }
  }
}
