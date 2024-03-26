import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { RawEvent } from '@/libs/blockchain/mvx/event-decoder';
import { CompetingRabbitConsumer } from '@/libs/blockchain/mvx/events-notifier';

import { EventIdentifier } from './enums';
import {
  DepositEvent,
  WithdrawEvent,
  TransferEvent,
  CreatePaymentAgreementEvent,
  SignPaymentAgreementEvent,
  TriggerAgreementEvent,
  PaymentEvent,
} from './events';

type QueuePayload = Record<string, unknown> & {
 events: RawEvent[];
}

@Injectable()
export class EventsNotifierService {
  private readonly logger = new Logger(EventsNotifierService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @CompetingRabbitConsumer({
    queueName: process.env.EVENTS_NOTIFIER_QUEUE_NAME,
  })
  async consumeEvents(payload: QueuePayload) {
    const { events = [] } = payload;
    const lunarPayEvents = this.filterLunarPayEvents(events);

    for (const rawEvent of lunarPayEvents) {
      if(rawEvent.identifier === 'completedTxEvent') continue;

      try {
        const event = this.decodeEvent(rawEvent);
        this.eventEmitter.emit(event.emitEventName, event);
      } catch (error) {
        this.logger.error(error);
      }
    }
  }

  private filterLunarPayEvents(events: RawEvent[]) {
    return events.filter(
      (item) => item.address === this.config.get('contracts').lunarPayVault,
    );
  }

  private decodeEvent(rawEvent: RawEvent) {
    switch (rawEvent.identifier) {
      case EventIdentifier.EGLD_DEPOSIT:
      case EventIdentifier.ESDT_DEPOSIT:
        return new DepositEvent(rawEvent);

      case EventIdentifier.EGLD_WITHDRAWAL:
      case EventIdentifier.ESDT_WITHDRAWAL:
        return new WithdrawEvent(rawEvent);

      case EventIdentifier.TOKEN_TRANSFER:
        return new TransferEvent(rawEvent);

      case EventIdentifier.CREATE_PAYMENT_AGREEMENT:
        return new CreatePaymentAgreementEvent(rawEvent);

      case EventIdentifier.SIGN_PAYMENT_AGREEMENT:
        return new SignPaymentAgreementEvent(rawEvent);

      case EventIdentifier.TRIGGER_AGREEMENT:
        return new TriggerAgreementEvent(rawEvent);

      case EventIdentifier.PAYMENT:
        return new PaymentEvent(rawEvent);
    }
  }
}
