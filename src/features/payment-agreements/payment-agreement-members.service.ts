import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { CreateAgreementMemberDto } from './dto';
import { PaymentAgreement } from './payment-agreement.schema';
import { PaymentAgreementMemberRepository } from './payment-agreement-member.repository';
import { PaymentAgreementRepository } from './payment-agreement.repository';
import { SignedAgreementDto } from './dto/signed-agreement.dto';
import { PaymentAgreementMember } from './payment-agreement-member.schema';
import PaginationParams from '@/common/models/pagination.params.model';

@Injectable()
export class PaymentAgreementMembersService {
  private static readonly ITEMS_PER_PAGE = 10;

  constructor(
    private readonly repository: PaymentAgreementMemberRepository,
    private readonly agreementsRepository: PaymentAgreementRepository,
  ) {}

  async findAddressMemberships(address: string, pagination: PaginationParams = new PaginationParams()) {
    const memberships = await this.repository.model
    .find({ member: address })
    
    const aggrementIds = memberships.map(item => item.internalAgreementId);

    const operationsCount = await this.repository.model.find({ _id: { $in: aggrementIds } }).countDocuments({})
    const itemsPerPage = PaymentAgreementMembersService.ITEMS_PER_PAGE
    const numberOfPages = Math.ceil(operationsCount / itemsPerPage)

    const allSignedAgreements: PaymentAgreement[] = await this.agreementsRepository.model
      .find({ _id: { $in: aggrementIds } })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .sort({ createdAt: 'desc' })
      .lean();

    return {
      agreements: allSignedAgreements.map((el) => {
        return new SignedAgreementDto(el)
      }),
      numberOfPages: numberOfPages
    }
  }

  async findAgreementMembers(id: Types.ObjectId, pagination: PaginationParams = new PaginationParams()) {
    const operationsCount = await this.repository.model.find({ internalAgreementId: id }).countDocuments({})
    const itemsPerPage = PaymentAgreementMembersService.ITEMS_PER_PAGE
    const numberOfPages = Math.ceil(operationsCount / itemsPerPage)
    
    const allMemberships = await this.repository.model
    .find({ internalAgreementId: id })
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
  
  async findMembership(id: Types.ObjectId, address: string): Promise<PaymentAgreementMember> {
    return this.repository.model.findOne({ internalAgreementId: id, member: address });
  }

  createMembership(dto: CreateAgreementMemberDto) {
    return this.repository.model.create({
      ...dto,
      lastChargedAt: dto.createdAt,
      lastSuccessfulCharge: dto.createdAt,
    });
  }
}
