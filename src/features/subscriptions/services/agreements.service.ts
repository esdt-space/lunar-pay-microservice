import { Types } from 'mongoose';
import { AgreementsRepository } from '../repositories/agreements.repository';
import { AgreementEntity } from '../schemas/agreement.entity';
import { AgreementDto } from '../dto/agreement.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AgreementsService {
  constructor(private readonly repository: AgreementsRepository) {}

  async findAccountAgreements(address: string): Promise<AgreementEntity[]> {
    console.log('all subs');

    return this.repository.model.find({ owner: address });
  }

  async findOneAgreementById(id: Types.ObjectId): Promise<AgreementEntity> {
    return this.repository.model.findOne({ _id: id });
  }

  async createAgreement(
    address: string,
    dto: AgreementDto,
  ): Promise<AgreementEntity> {
    const newAgreement = await this.repository.model.create({
      ...dto,
      owner: address,
    });

    return newAgreement;
  }

  async deleteOneAgreementById(id: Types.ObjectId) {
    return this.repository.model.deleteOne({ _id: id });
  }
}
