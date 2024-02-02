import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { CreateSubscriptionMemberDto } from './dto';
import { Subscription } from './subscription.schema';
import { SubscriptionMemberRepository } from './subscription-member.repository';
import { SubscriptionRepository } from './subscription.repository';
import { SignedSubscriptionDto } from './dto/signed-subscription.dto';
import { SubscriptionMember } from './subscription-member.schema';
import PaginationParams from '@/common/models/pagination.params.model';

@Injectable()
export class SubscriptionMembersService {
  private static readonly ITEMS_PER_PAGE = 10;

  constructor(
    private readonly repository: SubscriptionMemberRepository,
    private readonly subscriptionsRepository: SubscriptionRepository,
  ) {}

  async findAddressMemberships(address: string, pagination: PaginationParams = new PaginationParams()) {
    const memberships = await this.repository.model
    .find({ member: address })
    
    const subscriptionIds = memberships.map(item => item.internalSubscriptionId);

    const operationsCount = await this.repository.model.find({ _id: { $in: subscriptionIds } }).countDocuments({})
    const itemsPerPage = SubscriptionMembersService.ITEMS_PER_PAGE
    const numberOfPages = Math.ceil(operationsCount / itemsPerPage)

    const allSignedSubscriptions: Subscription[] = await this.subscriptionsRepository.model
      .find({ _id: { $in: subscriptionIds } })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .sort({ createdAt: 'desc' })
      .lean();

    return {
      subscriptions: allSignedSubscriptions.map((el) => {
        return new SignedSubscriptionDto(el)
      }),
      numberOfPages: numberOfPages
    }
  }

  async findSubscriptionMembers(id: Types.ObjectId, pagination: PaginationParams = new PaginationParams()) {
    const operationsCount = await this.repository.model.find({ internalSubscriptionId: id }).countDocuments({})
    const itemsPerPage = SubscriptionMembersService.ITEMS_PER_PAGE
    const numberOfPages = Math.ceil(operationsCount / itemsPerPage)
    
    const allMemberships = await this.repository.model
    .find({ internalSubscriptionId: id })
    .skip(pagination.skip)
    .limit(pagination.limit)
    .sort({ createdAt: 'desc' })

    return {
      memberships: allMemberships,
      numberOfPages: numberOfPages
    }
  }

  async updateLastChargedAt(member: string, date: Date){
    const newCharge = { $set: { lastSuccessfulCharge: date }}

    return this.repository.model.updateOne({ member: member }, newCharge);
  }
  
  async findMembership(id: Types.ObjectId, address: string): Promise<SubscriptionMember> {
    return this.repository.model.findOne({ internalSubscriptionId: id, member: address });
  }

  createMembership(dto: CreateSubscriptionMemberDto) {
    return this.repository.model.create({
      ...dto,
      lastChargedAt: dto.createdAt,
      lastSuccessfulCharge: dto.createdAt,
    });
  }
}
