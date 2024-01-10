import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/libs/database/mongo';

import { AgreementTrigger } from './agreement-trigger.schema';

@Injectable()
export class AgreementTriggerRepository extends AbstractRepository<AgreementTrigger> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(AgreementTrigger.name) public model: Model<AgreementTrigger>,
  ) {
    super(model, connection);
  }
}