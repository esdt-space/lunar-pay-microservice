import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PaymentAgreementsService } from './payment-agreements.service';
import { PaymentAgreementRepository } from './payment-agreement.repository';
import { PaymentAgreement, PaymentAgreementSchema } from './payment-agreement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentAgreement.name, schema: PaymentAgreementSchema },
    ]),
  ],
  providers: [PaymentAgreementsService, PaymentAgreementRepository],
  exports: [PaymentAgreementsService, PaymentAgreementRepository],
})
export class PaymentAgreementsModule {}
