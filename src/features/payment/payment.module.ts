import { Module } from "@nestjs/common";

import { PaymentEventHandler } from "./payment-event.handler";

import { TokenOperationModule } from "../token-operations/token-operation.module";
import { DonationsModule } from "../donations/donations.module";

@Module({
  imports: [
    TokenOperationModule,
    DonationsModule
  ],
  providers: [
    PaymentEventHandler,
  ],
  exports: [
  ],
})
export class PaymentsModule {}