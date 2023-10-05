import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/libs/database/mongo';

import { AgreementEntity } from '../schemas/agreement.entity';

@Injectable()
export class AgreementsRepository extends AbstractRepository<AgreementEntity> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(AgreementEntity.name) model: Model<AgreementEntity>,
  ) {
    super(model, connection);
  }
}
