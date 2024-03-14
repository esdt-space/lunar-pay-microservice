import { CachingModule } from "@/libs/caching";
import { Module } from "@nestjs/common";

import { DonationsModule } from "../donations/donations.module";
import { PaymentAgreementsModule } from "../payment-agreements/payment-agreements.module";
import { TokenOperationModule } from "../token-operations/token-operation.module";
import { EventService } from "./event.service";

@Module({
  imports: [
    CachingModule,

    PaymentAgreementsModule,
    DonationsModule,
    TokenOperationModule,
  ],
  providers: [ EventService ],
  exports: [ EventService ]
})
export class EventModule {}
