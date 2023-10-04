import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/libs/database/mongo';

import { SubscriptionEntity } from '../schemas/subscription.entity';

@Injectable()
export class SubscriptionRepository extends AbstractRepository<SubscriptionEntity> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(SubscriptionEntity.name) model: Model<SubscriptionEntity>,
  ) {
    super(model, connection);
  }
}
