import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAgreementMemberDto } from './dto';
import PaginationParams from '@/common/models/pagination.params.model';
import { PaymentAgreement, PaymentAgreementMember } from './entities';
import { PaginatedResponse } from '@/common/models/paginated-response';

@Injectable()
export class PaymentAgreementMembersService {
  constructor(
    @InjectRepository(PaymentAgreementMember) private readonly agreementMembersRepository: Repository<PaymentAgreementMember>,
    @InjectRepository(PaymentAgreement) private readonly agreementsRepository: Repository<PaymentAgreement>
  ) {}

  async findAddressMemberships(address: string, pagination: PaginationParams = new PaginationParams()) {
    const [memberships, operationsCount] = await this.agreementMembersRepository.findAndCount({
      where: { member: address }
    });

    const agreementIds = memberships.map(item => item.internalAgreementId);

    const allSignedAgreements = await this.agreementsRepository.findBy({ 
      id: In(agreementIds) 
    });

    return new PaginatedResponse<PaymentAgreement>(allSignedAgreements, operationsCount, pagination)
  }

  async findAgreementMembers(id: string, pagination: PaginationParams = new PaginationParams()) {
    const [allMemberships, operationsCount] = await this.agreementMembersRepository.findAndCount({
      where: { internalAgreementId: id },
      skip: pagination.skip,
      take: pagination.limit,
      order: { createdAt: 'DESC' }
    });

    return new PaginatedResponse<PaymentAgreementMember>(allMemberships, operationsCount, pagination)
  }

  async updateLastChargedAt(member: string, date: Date) {
    await this.agreementMembersRepository.update({ member: member }, {
      lastSuccessfulCharge: date.toString()
    });
  }

  async findMembership(id: string, address: string): Promise<PaymentAgreementMember> {
    return this.agreementMembersRepository.findOneBy({ 
      internalAgreementId: id, 
      member: address 
    });
  }

  async createMembership(dto: CreateAgreementMemberDto): Promise<PaymentAgreementMember> {
    const membership = this.agreementMembersRepository.create({
      ...dto,
      lastChargedAt: dto.createdAt,
      lastSuccessfulCharge: dto.createdAt,
    });
    return this.agreementMembersRepository.save(membership);
  }
}
