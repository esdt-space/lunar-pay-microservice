import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { RawEvent, BlockchainEvent } from '@/libs/blockchain/mvx/event-decoder';
import { CompetingRabbitConsumer } from '@/libs/blockchain/mvx/events-notifier';

import { BlockchainEventDecoded, EventIdentifier } from './enums';
import { DonationEventTopics } from './events/donation';
import { PaymentEventTopics } from './events/payment';
import { CreateSubscriptionEventTopics } from './events/subscription/topics/create-subscription-event.topics';
import { SignSubscriptionEventTopics } from './events/subscription/topics/sign-subscription-event.topics';
import { DepositWithdrawEventTopics, TransferEventTopics } from './events/token-management';
import { TriggerSubscriptionEventTopics } from './events/subscription/topics/trigger-subscription-event.topics';
import { CreatePaymentAgreementEventTopics } from './events/payment-agreement/topics/create-payment-agreement-event.topics';
import { SignPaymentAgreementEventTopics } from './events/payment-agreement/topics/sign-payment-agreement-event.topics';
import { TriggerAgreementEventTopics } from './events/payment-agreement/topics/trigger-agreement-event.topics';
import { CancelSubscriptionEventTopics } from './events/subscription/topics/cancel-subscription-event.topics';

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
        return new BlockchainEvent<DepositWithdrawEventTopics>(rawEvent, BlockchainEventDecoded.BlockchainDepositEventDecoded, DepositWithdrawEventTopics);

      case EventIdentifier.EGLD_WITHDRAWAL:
      case EventIdentifier.ESDT_WITHDRAWAL:
        return new BlockchainEvent<DepositWithdrawEventTopics>(rawEvent, BlockchainEventDecoded.BlockchainWithdrawEventDecoded, DepositWithdrawEventTopics);

      case EventIdentifier.TOKEN_TRANSFER:
        return new BlockchainEvent<TransferEventTopics>(rawEvent, BlockchainEventDecoded.BlockchainTokenTransferEventDecoded, TransferEventTopics);

      case EventIdentifier.CREATE_PAYMENT_AGREEMENT:
        return new BlockchainEvent<CreatePaymentAgreementEventTopics>(rawEvent, BlockchainEventDecoded.BlockchainCreatePaymentAgreementEventDecoded, CreatePaymentAgreementEventTopics);

      case EventIdentifier.SIGN_PAYMENT_AGREEMENT:
        return new BlockchainEvent<SignPaymentAgreementEventTopics>(rawEvent, BlockchainEventDecoded.SignPaymentAgreement, SignPaymentAgreementEventTopics);

      case EventIdentifier.TRIGGER_AGREEMENT:
        return new BlockchainEvent<TriggerAgreementEventTopics>(rawEvent, BlockchainEventDecoded.TriggerPaymentAgreement, TriggerAgreementEventTopics);

      case EventIdentifier.PAYMENT:
        return new BlockchainEvent<PaymentEventTopics>(rawEvent, BlockchainEventDecoded.Payment, PaymentEventTopics);

      case EventIdentifier.DONATE_WITH_VAULT:
        return new BlockchainEvent<DonationEventTopics>(rawEvent, BlockchainEventDecoded.Donation, DonationEventTopics);
        
      case EventIdentifier.DONATE_WITH_WALLET:
        return new BlockchainEvent<DonationEventTopics>(rawEvent, BlockchainEventDecoded.Donation, DonationEventTopics);

      case EventIdentifier.CREATE_SUBSCRIPTION:
        return new BlockchainEvent<CreateSubscriptionEventTopics>(rawEvent, BlockchainEventDecoded.CreateSubscription, CreateSubscriptionEventTopics);

      case EventIdentifier.CREATE_SUBSCRIPTION_MEMBERSHIP:
        return new BlockchainEvent<SignSubscriptionEventTopics>(rawEvent, BlockchainEventDecoded.SignSubscription, SignSubscriptionEventTopics);

      case EventIdentifier.TRIGGER_SUBSCRIPTION:
        return new BlockchainEvent<TriggerSubscriptionEventTopics>(rawEvent, BlockchainEventDecoded.TriggerSubscription, TriggerSubscriptionEventTopics);

      case EventIdentifier.CANCEL_SUBSCRIPTION:
        return new BlockchainEvent<CancelSubscriptionEventTopics>(rawEvent, BlockchainEventDecoded.CancelSubscription, CancelSubscriptionEventTopics);
    }
  }
}
