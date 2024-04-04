import { CachingModule } from "@/libs/caching";
import { Module } from "@nestjs/common";

import { DonationsModule } from "../donations/donations.module";
import { TokenOperationModule } from "../token-operations/token-operation.module";
import { SubscriptionsModule } from "../subscriptions/subscriptions.module";
import { EventService } from "./event.service";

@Module({
  imports: [
    CachingModule,

    SubscriptionsModule,
    DonationsModule,
    TokenOperationModule,
  ],
  providers: [ EventService ],
  exports: [ EventService ]
})
export class EventModule {}
