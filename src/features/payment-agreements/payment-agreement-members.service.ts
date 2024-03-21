import { Injectable } from '@nestjs/common';

import { CreateAgreementMemberDto } from './dto';
import { SignedAgreementDto } from './dto/signed-agreement.dto';
import PaginationParams from '@/common/models/pagination.params.model';
import { PaymentAgreement, PaymentAgreementMember } from './entities';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentAgreementMembersService {
  private static readonly ITEMS_PER_PAGE = 10;

  constructor(
    @InjectRepository(PaymentAgreementMember) private agreementMembersRepository: Repository<PaymentAgreementMember>,
    @InjectRepository(PaymentAgreement) private agreementsRepository: Repository<PaymentAgreement>
  ) {}

  async findAddressMemberships(address: string, pagination: PaginationParams = new PaginationParams()) {
    const [memberships, operationsCount] = await this.agreementMembersRepository.findAndCount({
      where: { member: address }
    });

    const agreementIds = memberships.map(item => item.internalAgreementId);

    const allSignedAgreements = await this.agreementsRepository.findBy({ 
      id: In(agreementIds) 
    });

    const numberOfPages = Math.ceil(operationsCount / PaymentAgreementMembersService.ITEMS_PER_PAGE);

    return {
      agreements: allSignedAgreements.map(el => new SignedAgreementDto(el)),
      numberOfPages: numberOfPages
    };
  }

  async findAgreementMembers(id: string, pagination: PaginationParams = new PaginationParams()) {
    const [allMemberships, operationsCount] = await this.agreementMembersRepository.findAndCount({
      where: { internalAgreementId: id },
      skip: pagination.skip,
      take: pagination.limit,
      order: { createdAt: 'DESC' }
    });

    const numberOfPages = Math.ceil(operationsCount / PaymentAgreementMembersService.ITEMS_PER_PAGE);

    return {
      memberships: allMemberships,
      numberOfPages: numberOfPages
    };
  }

  async updateLastChargedAt(member: string, date: Date) {
    await this.agreementMembersRepository.update({ member: member }, {
      lastSuccessfulCharge: date
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
