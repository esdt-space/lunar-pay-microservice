import { Injectable, Logger } from '@nestjs/common';

import { GenericEvent, RawEvent } from '@/libs/blockchain/mvx/event-decoder';
import { CompetingRabbitConsumer } from '@/libs/blockchain/mvx/events-notifier';

import { UacEventsHandler } from '@/features/uac';
import {
  DepositEvent,
  WithdrawEvent,
  TransferEvent,
} from '@/events-notifier/events';
import { TransactionsEventHandler } from '@/features/transactions/transactions-event.handler';
import {
  TRANSACTION_EVENT,
  TRANSFER_EVENTS,
} from '@/events-notifier/events/generic.event.types';
import { TransferEventsHandler } from '@/features/transfer-events/transfer-events.handler';

@Injectable()
export class EventsConsumerService {
  private readonly logger = new Logger(EventsConsumerService.name);

  constructor(
    private readonly uacEventsHandler: UacEventsHandler,
    private readonly transactionEventHandler: TransactionsEventHandler,
    private readonly transferEventsHandler: TransferEventsHandler,
  ) {}

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
      case TRANSACTION_EVENT.DEPOSIT_EVENT:
        return this.transactionEventHandler.handleEvents(
          new DepositEvent(rawEvent),
        );
      case TRANSACTION_EVENT.WITHDRAW_EVENT:
        return this.transactionEventHandler.handleEvents(
          new WithdrawEvent(rawEvent),
        );
      case TRANSFER_EVENTS.TRANSFER:
        return this.transferEventsHandler.handleEvents(
          new TransferEvent(rawEvent),
        );
      default:
        return new GenericEvent(rawEvent);
    }
  }
}
