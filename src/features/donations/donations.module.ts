import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenOperationModule } from '@/features/token-operations/token-operation.module';
import { DonationsService } from './donations.service';
import { DonationsEventHandler } from './donations-event.handler';
import { DonationWidgetsService } from './donation-widgets.service';
import { Donation, DonationWidget } from './entities';

@Module({
  imports: [
    TokenOperationModule,
    TypeOrmModule.forFeature([Donation, DonationWidget]),
  ],
  providers: [
    DonationsService,
    DonationWidgetsService,
    DonationsEventHandler
  ],
  exports: [
    DonationsService,
    DonationWidgetsService,
  ],
})
export class DonationsModule {}
