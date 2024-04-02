import { Module } from "@nestjs/common";

import { PaymentEventHandler } from "./payment-event.handler";

import { TokenOperationModule } from "../token-operations/token-operation.module";

@Module({
  imports: [
    TokenOperationModule,
  ],
  providers: [
    PaymentEventHandler,
  ],
  exports: [
  ],
})
export class PaymentsModule {}