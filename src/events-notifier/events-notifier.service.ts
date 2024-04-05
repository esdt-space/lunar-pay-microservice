import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { RawEvent, TriggerEvent } from '@/libs/blockchain/mvx/event-decoder';
import { CompetingRabbitConsumer } from '@/libs/blockchain/mvx/events-notifier';

import { BlockchainEventDecoded, EventIdentifier } from './enums';
import { DonationEventTopics } from './events/donation';
import { PaymentEventTopics } from './events/payment';
import { CreateSubscriptionEventTopics } from './events/subscription/topics/create-subscription-event.topics';
import { SignSubscriptionEventTopics } from './events/subscription/topics/sign-subscription-event.topics';
import { DepositEventTopics, WithdrawEventTopics, TransferEventTopics } from './events/token-management';
import { TriggerSubscriptionEventTopics } from './events/subscription/topics/trigger-subscription-event.topics';
import { CreatePaymentAgreementEventTopics } from './events/payment-agreement/topics/create-payment-agreement-event.topics';
import { SignPaymentAgreementEventTopics } from './events/payment-agreement/topics/sign-payment-agreement-event.topics';
import { TriggerAgreementEventTopics } from './events/payment-agreement/topics/trigger-agreement-event.topics';

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
        return new TriggerEvent<DepositEventTopics>(rawEvent, BlockchainEventDecoded.BlockchainDepositEventDecoded, DepositEventTopics);

      case EventIdentifier.EGLD_WITHDRAWAL:
      case EventIdentifier.ESDT_WITHDRAWAL:
        return new TriggerEvent<WithdrawEventTopics>(rawEvent, BlockchainEventDecoded.BlockchainWithdrawEventDecoded, WithdrawEventTopics);

      case EventIdentifier.TOKEN_TRANSFER:
        return new TriggerEvent<TransferEventTopics>(rawEvent, BlockchainEventDecoded.BlockchainTokenTransferEventDecoded, TransferEventTopics);

      case EventIdentifier.CREATE_PAYMENT_AGREEMENT:
        return new TriggerEvent<CreatePaymentAgreementEventTopics>(rawEvent, BlockchainEventDecoded.BlockchainCreatePaymentAgreementEventDecoded, CreatePaymentAgreementEventTopics);

      case EventIdentifier.SIGN_PAYMENT_AGREEMENT:
        return new TriggerEvent<SignPaymentAgreementEventTopics>(rawEvent, BlockchainEventDecoded.SignPaymentAgreement, SignPaymentAgreementEventTopics);

      case EventIdentifier.TRIGGER_AGREEMENT:
        return new TriggerEvent<TriggerAgreementEventTopics>(rawEvent, BlockchainEventDecoded.TriggerPaymentAgreement, TriggerAgreementEventTopics);

      case EventIdentifier.PAYMENT:
        return new TriggerEvent<PaymentEventTopics>(rawEvent, BlockchainEventDecoded.Payment, PaymentEventTopics);

      case EventIdentifier.DONATE:
        return new TriggerEvent<DonationEventTopics>(rawEvent, BlockchainEventDecoded.Donation, DonationEventTopics);

      case EventIdentifier.CREATE_SUBSCRIPTION:
        return new TriggerEvent<CreateSubscriptionEventTopics>(rawEvent, BlockchainEventDecoded.CreateSubscription, CreateSubscriptionEventTopics);

      case EventIdentifier.CREATE_SUBSCRIPTION_MEMBERSHIP:
        return new TriggerEvent<SignSubscriptionEventTopics>(rawEvent, BlockchainEventDecoded.SignSubscription, SignSubscriptionEventTopics);

      case EventIdentifier.TRIGGER_SUBSCRIPTION:
        return new TriggerEvent<TriggerSubscriptionEventTopics>(rawEvent, BlockchainEventDecoded.TriggerSubscription, TriggerSubscriptionEventTopics);
    }
  }
}
