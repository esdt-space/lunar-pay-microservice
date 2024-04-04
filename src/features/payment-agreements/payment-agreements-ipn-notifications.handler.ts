import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { IpnSender } from '@/core/ipn';
import { EventType } from '@/application-events/enums/event-type.enum';

import { SubscriptionChargeCreatedEventPayload, SubscriptionMembershipCreatedEventPayload } from '@/application-events/enums/types/subscription-charge-created-payload.type';

@Injectable()
export class PaymentAgreementsIpnNotificationsHandler {
  constructor(public readonly ipnSender: IpnSender) {}

  @OnEvent(EventType.SubscriptionMembershipCreated)
  async sendNewSubscriptionMembershipIpn(payload: SubscriptionMembershipCreatedEventPayload){
    const { agreement, membership } = payload;

    if((agreement.signSubscriptionHttpCallbackUrl || '').length === 0) return;

    return this.ipnSender.sendPostWebhook(agreement.signSubscriptionHttpCallbackUrl, {
      eventName: EventType.SubscriptionMembershipCreated,
      subscriptionId: agreement.id,
      walletAddress: membership.member,
      // metadata: membership.metadata,
    });
  }

  @OnEvent(EventType.SubscriptionChargeCreated)
  async sendNewSubscriptionChargeIpn(payload: SubscriptionChargeCreatedEventPayload){
    const { agreement, totalAmount, memberInformation } = payload;

    if((agreement.signSubscriptionHttpCallbackUrl || '').length === 0) return;

    return this.ipnSender.sendPostWebhook(agreement.signSubscriptionHttpCallbackUrl, {
      eventName: EventType.SubscriptionChargeCreated,
      amountCharged: totalAmount,
      subscriptionId: agreement.id,
      walletsCharged: memberInformation,
    });
  }
}