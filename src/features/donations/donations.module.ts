import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenOperationModule } from '@/features/token-operations/token-operation.module';
import { Donation, DonationSchema } from './donation.schema';
import { DonationRepository } from './donation.repository';
import { DonationsService } from './donations.service';
import { DonationsEventHandler } from './donations-event.handler';

@Module({
  imports: [
    TokenOperationModule,
    MongooseModule.forFeature([
      { name: Donation.name, schema: DonationSchema },
    ]),
  ],
  providers: [
    DonationsService, DonationRepository,
    DonationsEventHandler
  ],
  exports: [
    DonationsService, DonationRepository,
  ],
})
export class DonationsModule {}
