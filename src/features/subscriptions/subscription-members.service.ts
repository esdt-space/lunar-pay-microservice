import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSubscriptionMemberDto } from './dto';
import PaginationParams from '@/common/models/pagination.params.model';
import { Subscription, SubscriptionMember } from './entities';
import { PaginatedResponse } from '@/common/models/paginated-response';

@Injectable()
export class SubscriptionMembersService {
  constructor(
    @InjectRepository(SubscriptionMember) private readonly subscriptionMembersRepository: Repository<SubscriptionMember>,
    @InjectRepository(Subscription) private readonly subscriptionsRepository: Repository<Subscription>
  ) {}

  async findAddressMemberships(address: string, pagination: PaginationParams = new PaginationParams()) {
    const [memberships, operationsCount] = await this.subscriptionMembersRepository.findAndCount({
      where: { member: address },
      order: { createdAt: 'DESC' }
    });

    const agreementIds = memberships.map(item => item.internalSubscriptionId);

    const allSignedAgreements = await this.subscriptionsRepository.findBy({ 
      id: In(agreementIds) 
    });

    return new PaginatedResponse<Subscription>(allSignedAgreements, operationsCount, pagination)
  }

  async findSubscriptionMembers(id: string, pagination: PaginationParams = new PaginationParams()) {
    const [allMemberships, operationsCount] = await this.subscriptionMembersRepository.findAndCount({
      where: { internalSubscriptionId: id },
      skip: pagination.skip,
      take: pagination.limit,
      order: { createdAt: 'DESC' }
    });

    return new PaginatedResponse<SubscriptionMember>(allMemberships, operationsCount, pagination)
  }

  async findAllSubscriptionMemberships(id: string) {
    const allMemberships = await this.subscriptionMembersRepository
      .find({
        where: { internalSubscriptionId: id },
        order: { createdAt: 'DESC' }
      });

    return allMemberships
  }

  async updateLastChargedAt(member: string, date: Date){
    await this.subscriptionMembersRepository.update({ member: member }, {
      lastSuccessfulCharge: date.toString()
    });
  }
  
  async findMembership(id: string, address: string): Promise<SubscriptionMember> {
    return this.subscriptionMembersRepository.findOneBy({ 
      internalSubscriptionId: id, 
      member: address 
    });
  }

  createMembership(dto: CreateSubscriptionMemberDto) {
    const membership = this.subscriptionMembersRepository.create(dto);
    
    return this.subscriptionMembersRepository.save(membership);
  }
}
