import { Types } from 'mongoose';
import { SubscriptionRepository } from '../repositories/subscription.repository';
import { SubscriptionEntity } from '../schemas/subscription.entity';
import { SubscriptionDto } from '../dto/subscription.dto';

export class SubscriptionsService {
  constructor(private readonly repository: SubscriptionRepository) {}

  async findAllSubscriptions(): Promise<SubscriptionEntity[]> {
    return this.repository.model.find();
  }

  async findOneSubscriptionById(
    id: Types.ObjectId,
  ): Promise<SubscriptionEntity> {
    return this.repository.findOne({ _id: id });
  }

  async createSubscription(dto: SubscriptionDto): Promise<SubscriptionEntity> {
    const newSubscription = await this.repository.create(dto);

    return newSubscription;
  }

  async deleteOneSubscriptionById(id: Types.ObjectId) {
    return this.repository.model.deleteOne({ _id: id });
  }
}
