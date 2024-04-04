import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IpnModule } from '@/core/ipn/ipn.module';
import { TokenOperationModule } from '@/features/token-operations/token-operation.module';

import { PaymentAgreementsService } from './payment-agreements.service';
import { PaymentAgreementsEventHandler } from './payment-agreements-event.handler';

import { PaymentAgreementMembersService } from './payment-agreement-members.service';
import { AgreementTriggerModule } from '../agreement-triggers/agreement-triggers.module';
import { PaymentAgreement, PaymentAgreementMember } from './entities';

import { PaymentAgreementsIpnNotificationsHandler } from './payment-agreements-ipn-notifications.handler';

@Module({
  imports: [
    IpnModule,
    AgreementTriggerModule,
    TokenOperationModule,
    TypeOrmModule.forFeature([PaymentAgreement, PaymentAgreementMember]),
  ],
  providers: [
    PaymentAgreementsService,
    PaymentAgreementMembersService,
    PaymentAgreementsEventHandler
  ],
  exports: [
    PaymentAgreementsService,
    PaymentAgreementMembersService,
  ],
})
export class PaymentAgreementsModule {}
