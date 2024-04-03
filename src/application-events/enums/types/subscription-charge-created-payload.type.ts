import { TriggerAgreementEvent } from '@/events-notifier/events';
import { AgreementTrigger } from '@/features/agreement-triggers/entities';
import { PaymentAgreement, PaymentAgreementMember } from '@/features/payment-agreements/entities';

type MemberInformation = {
  address: string, 
  totalAmount: string
}

export type SubscriptionChargeCreatedEventPayload = {
  agreement: PaymentAgreement,
  agreementTrigger: AgreementTrigger,
  blockchainEvent: TriggerAgreementEvent,
  totalAmount: string,
  memberInformation: MemberInformation[]
}

export type SubscriptionMembershipCreatedEventPayload = {
  agreement: PaymentAgreement,
  membership: PaymentAgreementMember
}
