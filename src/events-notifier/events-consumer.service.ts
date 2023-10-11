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
import { TRANSACTION_EVENT } from '@/events-notifier/events/generic.event.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventsConsumerService {
  private readonly logger = new Logger(EventsConsumerService.name);

  constructor(
    private readonly uacEventsHandler: UacEventsHandler,
    private readonly transactionEventHandler: TransactionsEventHandler,
    private readonly config: ConfigService,
  ) {}

  @CompetingRabbitConsumer({
    queueName: 'events-7cfbcb1b',
  })
  consumeEvents(rawEvents: any) {
    try {
      const events: any[] = rawEvents?.events ?? [];

      const lunarPayEvent = events.filter(
        (item) => item.address === this.config.get('contracts').lunarPayVault,
      );

      for (const rawEvent of lunarPayEvent) {
        this.decodeEvent(rawEvent);
      }
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
    switch (rawEvent.identifier) {
      case TRANSACTION_EVENT.DEPOSIT_EVENT:
        return this.transactionEventHandler.handleEvents(
          new DepositEvent(rawEvent),
        );
      case TRANSACTION_EVENT.WITHDRAW_EVENT:
        return this.transactionEventHandler.handleEvents(
          new WithdrawEvent(rawEvent),
        );
      case TRANSACTION_EVENT.TRANSFER_EVENT:
        return this.transactionEventHandler.handleEvents(
          new TransferEvent(rawEvent),
        );
      default:
        return new GenericEvent(rawEvent);
    }
  }
}
