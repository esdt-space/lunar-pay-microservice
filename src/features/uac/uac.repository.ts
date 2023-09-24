import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/libs/database/mongo';

import { UniqueAgreementIdentifier } from './uac.schema';

@Injectable()
export class UacRepository extends AbstractRepository<UniqueAgreementIdentifier> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(UniqueAgreementIdentifier.name)
    public model: Model<UniqueAgreementIdentifier>,
  ) {
    super(model, connection);
  }
}
