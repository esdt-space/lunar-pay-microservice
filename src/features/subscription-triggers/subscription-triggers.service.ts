import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import PaginationParams from '@/common/models/pagination.params.model';
import { CreateSubscriptionTriggerDto, UpdateSubscriptionTriggerDto } from './dto';
import { SubscriptionTrigger } from './entities';
import { PaginatedResponse } from '@/common/models/paginated-response';

@Injectable()
export class SubscriptionTriggerService {
  logger = new Logger();

  constructor(
    @InjectRepository(SubscriptionTrigger)  private readonly repository: Repository<SubscriptionTrigger>
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async findOneByTxHash(hash: string): Promise<SubscriptionTrigger> {
    return this.repository.findOneBy({ txHash: hash });
  }

  async create(triggerData: CreateSubscriptionTriggerDto): Promise<SubscriptionTrigger> {
    try {
      const subscriptionTrigger = this.repository.create(triggerData);

      return await this.repository.save(subscriptionTrigger);
    } catch (e: any) {
      this.logger.error('create_subscription_trigger', { error: e.stack });
    }

    return null;
  }

  async createOrUpdate(triggerData: CreateSubscriptionTriggerDto, updateData: UpdateSubscriptionTriggerDto, hash: string) {
    let subscriptionTrigger = await this.findOneByTxHash(hash);

    if(!subscriptionTrigger) {
      const subscriptionTrigger = await this.create(triggerData);

      return this.repository.save(subscriptionTrigger);
    } else {
      subscriptionTrigger = { ...subscriptionTrigger, ...updateData };

      return this.repository.save(subscriptionTrigger);
    }
  }

  async findAllSubscriptionTriggers(subscription: string, pagination: PaginationParams = new PaginationParams()) {
    const [result, total] = await this.repository.findAndCount({
      where: { subscription: subscription },
      order: { id: 'DESC' },
      skip: pagination.skip,
      take: pagination.limit,
    });
  
    return new PaginatedResponse<SubscriptionTrigger>(result, total, pagination)
  }
}
