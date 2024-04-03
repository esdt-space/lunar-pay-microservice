import { TriggerAgreementEvent } from '@/events-notifier/events';
import { PaymentAgreement } from '@/features/payment-agreements/payment-agreement.schema';
import { AgreementTrigger } from '@/features/agreement-triggers/agreement-trigger.schema';
import { PaymentAgreementMember } from '@/features/payment-agreements/payment-agreement-member.schema';

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
