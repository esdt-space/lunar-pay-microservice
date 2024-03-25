import { Injectable, Logger } from '@nestjs/common';

import PaginationParams from '@/common/models/pagination.params.model';
import { CreateAgreementTriggerDto, UpdateAgreementTriggerDto } from './dto';
import { AgreementTrigger } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AgreementTriggerService {
  logger = new Logger();

  constructor(
    @InjectRepository(AgreementTrigger)  private readonly repository: Repository<AgreementTrigger>
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async findOneByTxHash(hash: string): Promise<AgreementTrigger> {
    return this.repository.findOneBy({ txHash: hash });
  }

  async create(triggerData: CreateAgreementTriggerDto) {
    try {
      const trigger = this.repository.create(triggerData);

      return await this.repository.save(trigger);
    } catch (e: any) {
      this.logger.error('create_agreement_trigger', { error: e.stack });
      return null;
    }
  }

  async createOrUpdate(triggerData: CreateAgreementTriggerDto, updateData: UpdateAgreementTriggerDto, hash: string): Promise<AgreementTrigger> {
    let agreementTrigger = await this.findOneByTxHash(hash)[0];
  
    if (!agreementTrigger) {
      agreementTrigger = await this.create(triggerData);
    } else {
      await this.repository.update({ txHash: hash }, updateData);
      agreementTrigger = await this.repository.findOneBy({ txHash: hash });
    }
  
    return agreementTrigger;
  }

  async findAllAgreementTriggers(agreementId: string, pagination: PaginationParams = new PaginationParams()) {
    const [agreementTriggers, operationsCount] = await this.repository.findAndCount({
      where: { agreement: agreementId },
      order: { createdAt: 'DESC' },
      skip: pagination.skip,
      take: pagination.limit,
    });
  
    const numberOfPages = Math.ceil(operationsCount / pagination.limit);
  
    return {
      agreementTriggers: agreementTriggers,
      numberOfPages: numberOfPages,
    };
  }
}
