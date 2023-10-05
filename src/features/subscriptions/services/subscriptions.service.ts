import { Types } from 'mongoose';
import { SubscriptionRepository } from '../repositories/subscription.repository';
import { SubscriptionEntity } from '../schemas/subscription.entity';
import { SubscriptionDto } from '../dto/subscription.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly repository: SubscriptionRepository) {}

  async findAccountSubscriptions(
    address: string,
  ): Promise<SubscriptionEntity[]> {
    console.log('all subs');

    return this.repository.model.find({ owner: address });
  }

  async findOneSubscriptionById(
    id: Types.ObjectId,
  ): Promise<SubscriptionEntity> {
    return this.repository.model.findOne({ _id: id });
  }

  async createSubscription(
    address: string,
    dto: SubscriptionDto,
  ): Promise<SubscriptionEntity> {
    const newSubscription = await this.repository.model.create({
      ...dto,
      owner: address,
    });

    console.log('service:', newSubscription);

    return newSubscription;
  }

  async deleteOneSubscriptionById(id: Types.ObjectId) {
    return this.repository.model.deleteOne({ _id: id });
  }
}
