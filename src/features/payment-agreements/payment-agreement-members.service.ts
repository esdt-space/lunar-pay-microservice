import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { CreateAgreementMemberDto } from './dto';
import { PaymentAgreement } from './payment-agreement.schema';
import { PaymentAgreementMemberRepository } from './payment-agreement-member.repository';
import { PaymentAgreementRepository } from './payment-agreement.repository';
import { SignedAgreementDto } from './dto/signed-agreement.dto';

@Injectable()
export class PaymentAgreementMembersService {
  constructor(
    private readonly repository: PaymentAgreementMemberRepository,
    private readonly agreementsRepository: PaymentAgreementRepository,
  ) {}

  async findAddressMemberships(address: string): Promise<SignedAgreementDto[]> {
    const memberships = await this.repository.model
    .find({ member: address })
    

    const aggrementIds = memberships.map(item => item.internalAgreementId);

    const allSignedAgreements: PaymentAgreement[] = await this.agreementsRepository.model
      .find({ _id: { $in: aggrementIds } })
      .sort({ createdAt: 'desc' })
      .lean();

    return allSignedAgreements.map((el) => {
      return new SignedAgreementDto(el)
    })
  }

  async findAgreementMembers(id: Types.ObjectId): Promise<PaymentAgreement[]> {
    return this.repository.model.find({ internalAgreementId: id });
  }

  async updateLastChargedAt(id: Types.ObjectId){
    const newCharge = { $set: { lastChargedAt: new Date() }}

    return this.repository.model.updateOne({ internalAgreementId: id }, newCharge);
  }

  createMembership(dto: CreateAgreementMemberDto) {
    return this.repository.model.create({
      ...dto,
      lastChargedAt: dto.createdAt,
    });
  }
}
