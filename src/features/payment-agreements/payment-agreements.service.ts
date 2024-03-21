import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateAgreementDto } from './dto';
import { AgreementDto } from './dto/agreement.dto';
import PaginationParams from '@/common/models/pagination.params.model';
import { PaymentAgreement } from './entities';

@Injectable()
export class PaymentAgreementsService {
  constructor(
    @InjectRepository(PaymentAgreement)  private repository: Repository<PaymentAgreement>
  ) {}

  async findOneAgreementById(id: string): Promise<PaymentAgreement> {
    return this.repository.findOneBy({ id });
  }

  async findOneByIdSmartContractId(id: number): Promise<PaymentAgreement> {
    return this.repository.findOneBy({ agreementIdentifier: id });
  }

  async findLatestAgreementCreatedByAccount(address: string): Promise<PaymentAgreement> {
    return this.repository.findOne({
      where: { owner: address },
      order: { createdAt: 'DESC' },
    });
  }

  async findAgreementsCreatedByAccount(address: string, pagination: PaginationParams = new PaginationParams()) {
    const [result, total] = await this.repository.findAndCount({
      where: { owner: address },
      order: { createdAt: 'DESC' },
      skip: pagination.skip,
      take: pagination.limit,
    });
  
    return {
      agreements: result.map(el => new AgreementDto(el)),
      numberOfPages: Math.ceil(total / pagination.limit),
    };
  }

  async createAgreement(address: string, dto: any){
    const agreement = this.repository.create({
      ...dto,
      owner: address,
    });
  
    return await this.repository.save(agreement);
  }

  async updateAgreementById(address: string, id: string, dto: UpdateAgreementDto): Promise<PaymentAgreement> {
    let agreement = await this.repository.findOneBy({ id, owner: address });
    if (agreement) {
      agreement = { ...agreement, ...dto };
      return this.repository.save(agreement);
    }
    return null;
  }

  create(dto: any) {
    const agreement = this.repository.create({
      ...dto,
    });

    return this.repository.save(agreement);
  }

  async incrementMembersCount(id: string): Promise<void> {
    await this.repository.increment({ id }, 'accountsCount', 1);
  }
}
