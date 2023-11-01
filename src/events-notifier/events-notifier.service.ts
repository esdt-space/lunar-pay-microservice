import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { GenericEvent, RawEvent } from '@/libs/blockchain/mvx/event-decoder';
import { CompetingRabbitConsumer } from '@/libs/blockchain/mvx/events-notifier';

import { EventIdentifier } from './enums';
import {
  DepositEvent,
  WithdrawEvent,
  TransferEvent,
  CreatePaymentAgreementEvent,
  SignPaymentAgreementEvent,
  ClaimTotalAmountSuccessEvent,
  ClaimTotalAmountFailedEvent
} from './events';

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
  async consumeEvents(rawEvents: any) {
    const events: any[] = rawEvents?.events ?? [];
    const lunarPayEvent = events.filter(
      (item) => item.address === this.config.get('contracts').lunarPayVault,
    );

    for (const rawEvent of lunarPayEvent) {
      if((rawEvent as GenericEvent).identifier === 'completedTxEvent') continue;

      try {
        const event = this.decodeEvent(rawEvent);
        this.eventEmitter.emit(event.emitEventName, event);
      } catch (error) {
        this.logger.error(
          `An unhandled error occurred when consuming event: ${JSON.stringify(rawEvent)}`,
        );

        this.logger.error(error);
      }
    }
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

      case EventIdentifier.CLAIM_TOTAL_AMOUNT_SUCCESS:
        return new ClaimTotalAmountSuccessEvent(rawEvent);

      case EventIdentifier.CLAIM_TOTAL_AMOUNT_FAILED:
        return new ClaimTotalAmountFailedEvent(rawEvent);
    }
  }
}
