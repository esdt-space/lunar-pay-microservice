import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { TokenPriceEntity } from '../schemas/token.price.entity';
import { AbstractRepository } from '@/libs/database/mongo';

@Injectable()
export class TokenPricesRepository extends AbstractRepository<TokenPriceEntity> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(TokenPriceEntity.name) public model: Model<TokenPriceEntity>,
  ) {
    super(model, connection);
  }
}
