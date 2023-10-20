import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { CreateAgreementMemberDto } from './dto';
import { PaymentAgreement } from './payment-agreement.schema';
import { PaymentAgreementMemberRepository } from './payment-agreement-member.repository';

@Injectable()
export class PaymentAgreementMembersService {
  constructor(private readonly repository: PaymentAgreementMemberRepository) {}

  async findAddressMemberships(address: string): Promise<PaymentAgreement[]> {
    return this.repository.model.find({ member: address });
  }

  async findAgreementMembers(id: Types.ObjectId): Promise<PaymentAgreement[]> {
    return this.repository.model.find({ internalAgreementId: id });
  }

  createMembership(dto: CreateAgreementMemberDto) {
    return this.repository.model.create({
      ...dto,
      lastChargedAt: dto.createdAt,
    });
  }
}
