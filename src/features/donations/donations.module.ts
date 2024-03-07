import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenOperationModule } from '@/features/token-operations/token-operation.module';
import { Donation, DonationSchema } from './donation.schema';
import { DonationWidget, DonationWidgetSchema } from './donation-widget.schema';
import { DonationRepository } from './donation.repository';
import { DonationsService } from './donations.service';
import { DonationsEventHandler } from './donations-event.handler';
import { DonationWidgetsService } from './donation-widgets.service';
import { DonationWidgetRepository } from './donation-widget.repository';

@Module({
  imports: [
    TokenOperationModule,
    MongooseModule.forFeature([
      { name: Donation.name, schema: DonationSchema },
      { name: DonationWidget.name, schema: DonationWidgetSchema },
    ]),
  ],
  providers: [
    DonationsService, DonationRepository,
    DonationWidgetsService, DonationWidgetRepository,
    DonationsEventHandler
  ],
  exports: [
    DonationsService, DonationRepository,
    DonationWidgetsService, DonationWidgetRepository,
  ],
})
export class DonationsModule {}
