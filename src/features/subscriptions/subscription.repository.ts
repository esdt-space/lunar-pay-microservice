import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/libs/database/mongo';

import { Subscription } from './subscription.schema';

@Injectable()
export class SubscriptionRepository extends AbstractRepository<Subscription> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(Subscription.name) model: Model<Subscription>,
  ) {
    super(model, connection);
  }
}
