import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubscriptionDto, UpdateSubscriptionDto } from './dto';
import PaginationParams from '@/common/models/pagination.params.model';
import { Subscription } from './entities';
import { PaginatedResponse } from '@/common/models/paginated-response';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)  private readonly repository: Repository<Subscription>
  ) {}

  async countUsersSubscriptions() {
    const subscriptionsCount = await this.repository.query(`
      SELECT
        owner AS "userId",
        JSON_AGG(JSON_BUILD_OBJECT('type', 'subscription-created', 'count', count)) AS actions,
        SUM(count) AS "allActions"
      FROM (
        SELECT
          owner,
          'subscription-created' AS type,
          COUNT(*) AS count
        FROM
          subscription
        GROUP BY
          owner
      ) AS grouped_subscriptions
      GROUP BY
        owner
    `);
  
    return subscriptionsCount.map(row => ({
      userId: row.userId,
      actions: row.actions,
      allActions: parseInt(row.allActions, 10)
    }));
  };

  async findOneSubscriptionById(id: string): Promise<Subscription> {
    return this.repository.findOneBy({ id });
  }

  async findOneByIdSmartContractId(id: number): Promise<Subscription> {
    return this.repository.findOneBy({ subscriptionIdentifier: id });
  }

  async findLatestSubscriptionCreatedByAccount(
    address: string,
    identifier: number
  ): Promise<Subscription> {
    return this.repository.findOne({
      where: { owner: address, subscriptionIdentifier: identifier },
      order: { createdAt: 'DESC' },
    });
  }

  async findSubscriptionsCreatedByAccount(
    address: string,
    pagination: PaginationParams = new PaginationParams()
  ) {
    const [result, total] = await this.repository.findAndCount({
      where: { owner: address },
      order: { createdAt: 'DESC' },
      skip: pagination.skip,
      take: pagination.limit,
    });
  
    return new PaginatedResponse<Subscription>(result, total, pagination)
  }

  async updateSubscriptionById(
    address: string,
    id: string,
    dto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    let agreement = await this.repository.findOneBy({ id, owner: address });

    if (agreement) {
      agreement = { ...agreement, ...dto };
      return this.repository.save(agreement);
    }

    return null;
  }

  create(dto: CreateSubscriptionDto) {
    const agreement = this.repository.create({
      ...dto,
      createdAt: new Date()
    });

    return this.repository.save(agreement);
  }

  async incrementMembersCount(id: string): Promise<void> {
    await this.repository.increment({ id }, 'accountsCount', 1);
  }

  async decrementMembersCount(id: string): Promise<void> {
    await this.repository.decrement({ id }, 'accountsCount', 1);
  }
}
