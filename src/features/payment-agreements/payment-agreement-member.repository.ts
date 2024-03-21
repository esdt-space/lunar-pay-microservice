// import { Connection, Model } from 'mongoose';
// import { Injectable } from '@nestjs/common';
// import { InjectConnection, InjectModel } from '@nestjs/mongoose';

// import { AbstractRepository } from '@/libs/database/mongo';

// import { PaymentAgreementMember } from './payment-agreement-member.schema';

// @Injectable()
// export class PaymentAgreementMemberRepository extends AbstractRepository<PaymentAgreementMember> {
//   constructor(
//     @InjectConnection() connection: Connection,
//     @InjectModel(PaymentAgreementMember.name) model: Model<PaymentAgreementMember>,
//   ) {
//     super(model, connection);
//   }
// }
