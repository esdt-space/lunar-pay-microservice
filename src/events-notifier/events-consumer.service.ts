import { Injectable, Logger } from '@nestjs/common';

import { GenericEvent, RawEvent } from '@/libs/blockchain/mvx/event-decoder';
import { CompetingRabbitConsumer } from '@/libs/blockchain/mvx/events-notifier';

import { UacEventsHandler } from '@/features/uac';
import {
  DepositEvent,
  WithdrawEvent,
  TransferEvent,
} from '@/events-notifier/events';
import { TransferEventsService } from '@/features/transfer-events/services/transfer.events.service';
import { TransactionsEventHandler } from "@/features/transactions/transactions-event.handler";
import {TransactionType} from "@/features/transactions/enums/transaction-type.enum";
import {TRANSACTION_EVENT, TRANSFER_EVENTS} from "@/events-notifier/events/generic.event.types";

@Injectable()
export class EventsConsumerService {
  private readonly logger = new Logger(EventsConsumerService.name);

  constructor(
    private readonly uacEventsHandler: UacEventsHandler,
    private readonly transactionEventHandler: TransactionsEventHandler,
    private readonly transferEventService: TransferEventsService,
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
        const eventTransfer = new TransferEvent(rawEvent);
        return eventTransfer;
      default:
        return new GenericEvent(rawEvent);
    }
  }
}
