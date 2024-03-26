import { Types } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

import PaginationParams from '@/common/models/pagination.params.model';
import { PaginatedResponse } from '@/common/models/paginated-response';

import { SubscriptionTrigger } from './subscription-trigger.schema';
import { SubscriptionTriggerRepository } from './subscription-trigger.repository';
import { CreateSubscriptionTriggerDto, UpdateSubscriptionTriggerDto } from './dto';

@Injectable()
export class SubscriptionTriggerService {
  logger = new Logger();

  constructor(private readonly repository: SubscriptionTriggerRepository) {
    this.logger = new Logger(this.constructor.name);
  }

  async findOneByTxHash(hash: string): Promise<SubscriptionTrigger> {
    return this.repository.model.findOne({ txHash: hash }).exec();
  }

  async create(triggerData: CreateSubscriptionTriggerDto): Promise<SubscriptionTrigger> {
    try {
      return await this.repository.model.create(triggerData);
    } catch (e: any) {
      this.logger.error('create_subscription_trigger', { error: e.stack });
    }

    return null;
  }

  async createOrUpdate(triggerData: CreateSubscriptionTriggerDto, updateData: UpdateSubscriptionTriggerDto, hash: string) {
    let subscriptionTrigger = await this.findOneByTxHash(hash);

    if(!subscriptionTrigger) {
      subscriptionTrigger = await this.create(triggerData);
    }

    await this.repository.model.updateOne({ txHash: hash }, updateData);

    return subscriptionTrigger;
  }

  async findAllSubscriptionTriggers(subscription: Types.ObjectId, pagination: PaginationParams = new PaginationParams()) {
    const operationsCount = await this.repository.model.find({ subscription: subscription }).countDocuments({});
    const numberOfPages = Math.ceil(operationsCount / pagination.limit);

    const allSubscriptionTriggers = await this.repository.model
      .find({ subscription: subscription })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .sort({ _id: 'desc' });

    return {
      subscriptionTriggers: allSubscriptionTriggers,
      numberOfPages: numberOfPages
    };
  }
}
