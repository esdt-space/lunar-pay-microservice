import { Types } from 'mongoose';
import { AgreementsRepository } from '../repositories/agreements.repository';
import { AgreementEntity } from '../schemas/agreement.entity';
import { UpdateAgreementDto } from '../dto/agreement.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AgreementsService {
  constructor(private readonly repository: AgreementsRepository) {}

  async findAccountAgreements(address: string): Promise<AgreementEntity[]> {
    return this.repository.model.find({ owner: address });
  }

  async findOneAgreementById(id: Types.ObjectId): Promise<AgreementEntity> {
    return this.repository.model.findOne({ _id: id });
  }

  async createAgreement(address: string, dto: any): Promise<AgreementEntity> {
    const newAgreement = await this.repository.model.create({
      ...dto,
      owner: address,
    });

    return newAgreement;
  }

  async deleteOneAgreementById(id: Types.ObjectId) {
    return this.repository.model.deleteOne({ _id: id });
  }

  async updateAgreementById(
    address: string,
    id: string,
    dto: UpdateAgreementDto,
  ) {
    const updatedAgreement = await this.repository.model.findByIdAndUpdate(id, {
      owner: address,
      ...dto,
    });

    return updatedAgreement;
  }
}
