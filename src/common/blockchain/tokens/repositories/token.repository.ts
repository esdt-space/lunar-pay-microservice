import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/libs/database/mongo';

import { TokenEntity } from '../schemas/token.entity';

@Injectable()
export class TokenRepository extends AbstractRepository<TokenEntity> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(TokenEntity.name) public model: Model<TokenEntity>,
  ) {
    super(model, connection);
  }
}
