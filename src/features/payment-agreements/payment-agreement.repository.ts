// import { Connection, Model } from 'mongoose';
// import { Injectable } from '@nestjs/common';
// import { InjectConnection, InjectModel } from '@nestjs/mongoose';

// import { AbstractRepository } from '@/libs/database/mongo';

// import { PaymentAgreement } from './payment-agreement.schema';

// @Injectable()
// export class PaymentAgreementRepository extends AbstractRepository<PaymentAgreement> {
//   constructor(
//     @InjectConnection() connection: Connection,
//     @InjectModel(PaymentAgreement.name) model: Model<PaymentAgreement>,
//   ) {
//     super(model, connection);
//   }
// }
