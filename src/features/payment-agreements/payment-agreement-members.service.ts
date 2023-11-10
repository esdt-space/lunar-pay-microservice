import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { CreateAgreementMemberDto } from './dto';
import { PaymentAgreement } from './payment-agreement.schema';
import { PaymentAgreementMemberRepository } from './payment-agreement-member.repository';
import { PaymentAgreementRepository } from './payment-agreement.repository';
import { GetSignedAgreementDto } from './dto/get-signed-agreement.dto';

@Injectable()
export class PaymentAgreementMembersService {
  constructor(
    private readonly repository: PaymentAgreementMemberRepository,
    private readonly agreementsRepository: PaymentAgreementRepository,
  ) {}

  async findAddressMemberships(address: string): Promise<GetSignedAgreementDto[]> {
    const memberships = await this.repository.model.find({ member: address });

    const aggrementIds = memberships.map(item => item.internalAgreementId);

    const allSignedAgreements: PaymentAgreement[] = await this.agreementsRepository.find({ _id: { $in: aggrementIds } });

    return allSignedAgreements.map((el) => {
      return {
        ownerName: el.ownerName,
        itemName: el.itemName,
        tokenIdentifier: el.tokenIdentifier,
        benefits: el.benefits,
        content: el.content,
        description: el.description,
        frequency: el.frequency,
        accountsCount: el.accountsCount,
        fixedAmount: el.fixedAmount,
        createdAt: el.createdAt
      }
    })
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
