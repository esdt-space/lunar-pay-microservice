import { Types } from 'mongoose';
import { SubscriptionRepository } from '../repositories/subscription.repository';
import { SubscriptionEntity } from '../schemas/subscription.entity';
import { SubscriptionDto } from '../dto/subscription.dto';

export class SubscriptionsService {
  constructor(private readonly repository: SubscriptionRepository) {}

  async findAll(): Promise<SubscriptionEntity[]> {
    return this.repository.model.find();
  }

  async create(
    subscriptionId: Types.ObjectId,
    dto: SubscriptionDto,
  ): Promise<SubscriptionEntity> {
    const newSubscription = await this.repository.create({
      subscriptionId: subscriptionId,
      ...dto,
    });

    return newSubscription;
  }
}
