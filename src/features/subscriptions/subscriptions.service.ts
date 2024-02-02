import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { Subscription } from './subscription.schema';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './dto';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionDto } from './dto/subscription.dto';
import PaginationParams from '@/common/models/pagination.params.model';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly repository: SubscriptionRepository) {}

  async findOneSubscriptionById(id: Types.ObjectId): Promise<Subscription> {
    return this.repository.model.findOne({ _id: id });
  }

  async findOneByIdSmartContractId(id: number): Promise<Subscription> {
    return this.repository.model.findOne({ subscriptionIdentifier: id });
  }

  async findLatestSubscriptionCreatedByAccount(
    address: string,
  ): Promise<Subscription> {
    return this.repository.model
      .findOne({ owner: address })
      .sort({ _id: 'desc' });
  }

  async findSubscriptionsCreatedByAccount(
    address: string,
    pagination: PaginationParams = new PaginationParams()
  ) {
    const operationsCount = await this.repository.model.find({ owner: address }).countDocuments({});
    const numberOfPages = Math.ceil(operationsCount / pagination.limit);

    const subscriptionsList: Subscription[] = await this.repository.model
      .find({ owner: address })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .sort({ createdAt: 'desc' })
      .lean();

    return {
      subscriptions: subscriptionsList.map((el) => {
        return new SubscriptionDto(el);
      }),
      numberOfPages: numberOfPages
    };
  }

  async createSubscription(address: string, dto: any): Promise<Subscription> {
    return this.repository.model.create({
      ...dto,
      owner: address,
    });
  }

  async updateSubscriptionById(
    address: string,
    id: string,
    dto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    return this.repository.model.findOneAndUpdate({ _id: id, owner: address }, {
      ...dto,
    });
  }

  create(dto: CreateSubscriptionDto) {
    return this.repository.model.create({
      owner: dto.owner,
      createdAt: dto.createdAt,
      subscriptionIdentifier: dto.subscriptionIdentifier,

      tokenNonce: dto.tokenNonce,
      tokenIdentifier: dto.tokenIdentifier,

      frequency: dto.frequency,
      amountType: dto.amountType,
      subscriptionType: dto.subscriptionType,

      fixedAmount: dto.fixedAmount,
      minimumAmount: dto.minimumAmount,
      maximumAmount: dto.maximumAmount,
    });
  }

  async incrementMembersCount(id: Types.ObjectId): Promise<void> {
    await this.repository.model.findOneAndUpdate(
      { _id: id },
      { $inc: { accountsCount: 1 } },
    );
  }
}
