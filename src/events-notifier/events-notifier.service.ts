import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

import { GenericEvent, RawEvent } from '@/libs/blockchain/mvx/event-decoder';
import { CompetingRabbitConsumer } from '@/libs/blockchain/mvx/events-notifier';

import { TokenOperationEventHandler } from '@/features/token-operations/token-operation-event.handler';

import { EventIdentifier } from './enums/event-identifier.enum';
import { DepositEvent, WithdrawEvent, TransferEvent } from './events';

@Injectable()
export class EventsNotifierService {
  private readonly logger = new Logger(EventsNotifierService.name);

  constructor(
    private readonly transactionEventHandler: TokenOperationEventHandler,
    private readonly config: ConfigService,
  ) {}

  @CompetingRabbitConsumer({
    queueName: 'events-7cfbcb1b',
  })
  async consumeEvents(rawEvents: any) {
    try {
      const events: any[] = rawEvents?.events ?? [];
      const lunarPayEvent = events.filter(
        (item) => item.address === this.config.get('contracts').lunarPayVault,
      );

      for (const rawEvent of lunarPayEvent) {
        if((rawEvent as GenericEvent).identifier === 'completedTxEvent') continue;

        const event = this.decodeEvent(rawEvent);
        await this.transactionEventHandler.handleEvents(event);
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
      case EventIdentifier.EGLD_DEPOSIT:
      case EventIdentifier.ESDT_DEPOSIT:
        return new DepositEvent(rawEvent);

      case EventIdentifier.EGLD_WITHDRAWAL:
      case EventIdentifier.ESDT_WITHDRAWAL:
        return new WithdrawEvent(rawEvent);

      case EventIdentifier.TOKEN_TRANSFER:
        return new TransferEvent(rawEvent);

      default:
        throw new Error('Cannot decode event');
    }
  }
}
