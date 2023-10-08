import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/libs/database/mongo';

import { TransferEvents } from '../schemas/transfer.events.schema';

@Injectable()
export class TransferEventsRepository extends AbstractRepository<TransferEvents> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(TransferEvents.name)
    public model: Model<TransferEvents>,
  ) {
    super(model, connection);
  }
}
