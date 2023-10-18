import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { UpdateAgreementDto } from './dto/update-agreement.dto';
import { PaymentAgreement } from './payment-agreement.schema';
import { PaymentAgreementRepository } from './payment-agreement.repository';

@Injectable()
export class PaymentAgreementsService {
  constructor(private readonly repository: PaymentAgreementRepository) {}

  async findOneAgreementById(id: Types.ObjectId): Promise<PaymentAgreement> {
    return this.repository.model.findOne({ _id: id });
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
}
