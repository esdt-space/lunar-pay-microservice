import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/libs/database/mongo';

import { SubscriptionMember } from './subscription-member.schema';

@Injectable()
export class SubscriptionMemberRepository extends AbstractRepository<SubscriptionMember> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(SubscriptionMember.name) model: Model<SubscriptionMember>,
  ) {
    super(model, connection);
  }
}
