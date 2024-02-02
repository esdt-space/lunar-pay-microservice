import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/libs/database/mongo';

import { SubscriptionTrigger } from './subscription-trigger.schema';

@Injectable()
export class SubscriptionTriggerRepository extends AbstractRepository<SubscriptionTrigger> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(SubscriptionTrigger.name) public model: Model<SubscriptionTrigger>,
  ) {
    super(model, connection);
  }
}