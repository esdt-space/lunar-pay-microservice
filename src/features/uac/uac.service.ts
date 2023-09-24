import { Injectable } from '@nestjs/common';

/** Local Imports **/
import { CreateUacDto } from './dto';
import { UacRepository } from './uac.repository';
import { UniqueAgreementIdentifier } from './uac.schema';

@Injectable()
export class UacService {
  constructor(private readonly repository: UacRepository) {}

  async findAllAddressUACs(
    address: string,
  ): Promise<UniqueAgreementIdentifier[]> {
    return this.repository.model.find({
      address: address,
    });
  }

  async findOneById(id: string): Promise<UniqueAgreementIdentifier> {
    return this.repository.model.findOne({ _id: id });
  }

  async findOneByCode(code: number): Promise<UniqueAgreementIdentifier> {
    return this.repository.model.findOne({ code: code });
  }

  async createUAC(dto: CreateUacDto) {
    return this.repository.model.create(dto);
  }
}
