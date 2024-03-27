import { TriggerAgreementEvent } from '@/events-notifier/events';
import { PaymentAgreement } from '@/features/payment-agreements/payment-agreement.schema';
import { AgreementTrigger } from '@/features/agreement-triggers/agreement-trigger.schema';

export type SubscriptionChargeCreatedEventPayload = {
  agreement: PaymentAgreement,
  agreementTrigger: AgreementTrigger,
  blockchainEvent: TriggerAgreementEvent,
  totalAmount: string,
  memberInformation: {address: string, totalAmount: string}[]
}