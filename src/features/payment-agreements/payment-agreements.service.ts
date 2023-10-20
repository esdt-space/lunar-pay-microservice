import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { UpdateAgreementDto } from './dto/update-agreement.dto';
import { PaymentAgreement } from './payment-agreement.schema';
import { PaymentAgreementRepository } from './payment-agreement.repository';
import { CreateAgreementDto } from '@/features/payment-agreements/dto/create-agreement.dto';

@Injectable()
export class PaymentAgreementsService {
  constructor(private readonly repository: PaymentAgreementRepository) {}

  async findOneAgreementById(id: Types.ObjectId): Promise<PaymentAgreement> {
    return this.repository.model.findOne({ _id: id });
  }

  async findOneByIdSmartContractId(id: number): Promise<PaymentAgreement> {
    return this.repository.model.findOne({ agreementIdentifier: id });
  }

  async findLatestAgreementCreatedByAccount(address: string): Promise<PaymentAgreement> {
    return this.repository.model.findOne({ owner: address }).sort({ '_id': 'desc' });
  }

  async findAgreementsCreatedByAccount(address: string): Promise<PaymentAgreement[]> {
    return this.repository.model.find({ owner: address });
  }

  async findAccountAgreements(address: string): Promise<PaymentAgreement[]> {
    return this.repository.model.find({ owner: address });
  }

  async createAgreement(address: string, dto: any): Promise<PaymentAgreement> {
    return this.repository.model.create({
      ...dto,
      owner: address,
    });
  }

  async updateAgreementById(address: string, id: string, dto: UpdateAgreementDto): Promise<PaymentAgreement> {
    return this.repository.model.findByIdAndUpdate(id, {
      owner: address,
      ...dto,
    });
  }

  create(dto: CreateAgreementDto) {
    return this.repository.model.create({
      owner: dto.owner,
      createdAt: dto.createdAt,
      agreementIdentifier: dto.agreementIdentifier,

      tokenNonce: dto.tokenNonce,
      tokenIdentifier: dto.tokenIdentifier,

      frequency: dto.frequency,
      amountType: dto.amountType,
      agreementType: dto.agreementType,

      fixedAmount: dto.fixedAmount,
      minimumAmount: dto.minimumAmount,
      maximumAmount: dto.maximumAmount,
    });
  }
}
