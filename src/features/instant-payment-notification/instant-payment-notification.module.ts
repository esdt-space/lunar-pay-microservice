import { Module } from "@nestjs/common";

import { InstantPaymentNotificationService } from "./instant-payment-notification.service";

@Module({
  imports: [],
  providers: [
    InstantPaymentNotificationService
  ],
  exports: [
    InstantPaymentNotificationService
  ],
})
export class InstantPaymentNotificationModule {}
