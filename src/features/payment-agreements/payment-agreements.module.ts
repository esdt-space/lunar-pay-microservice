import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenOperationModule } from '@/features/token-operations/token-operation.module';

import { PaymentAgreementsService } from './payment-agreements.service';
import { PaymentAgreementRepository } from './payment-agreement.repository';
import { PaymentAgreementsEventHandler } from './payment-agreements-event.handler';
import { PaymentAgreement, PaymentAgreementSchema } from './payment-agreement.schema';
import { PaymentAgreementMember, PaymentAgreementMemberSchema } from './payment-agreement-member.schema';

import { PaymentAgreementMembersService } from './payment-agreement-members.service';
import { PaymentAgreementMemberRepository } from './payment-agreement-member.repository';
import { AgreementTriggerModule } from '../agreement-triggers/agreement-triggers.module';

@Module({
  imports: [
    AgreementTriggerModule,
    TokenOperationModule,
    MongooseModule.forFeature([
      { name: PaymentAgreement.name, schema: PaymentAgreementSchema },
      { name: PaymentAgreementMember.name, schema: PaymentAgreementMemberSchema },
    ]),
  ],
  providers: [
    PaymentAgreementsService, PaymentAgreementRepository,
    PaymentAgreementMembersService, PaymentAgreementMemberRepository,
    PaymentAgreementsEventHandler
  ],
  exports: [
    PaymentAgreementsService, PaymentAgreementRepository,
    PaymentAgreementMembersService, PaymentAgreementMemberRepository,
  ],
})
export class PaymentAgreementsModule {}
