// import { Connection, Model } from 'mongoose';
// import { Injectable } from '@nestjs/common';
// import { InjectConnection, InjectModel } from '@nestjs/mongoose';

// import { AbstractRepository } from '@/libs/database/mongo';

// import { TokenOperation } from './token-operation.schema';

// @Injectable()
// export class TokenOperationRepository extends AbstractRepository<TokenOperation> {
//   constructor(
//     @InjectConnection() connection: Connection,
//     @InjectModel(TokenOperation.name) public model: Model<TokenOperation>,
//   ) {
//     super(model, connection);
//   }
// }
