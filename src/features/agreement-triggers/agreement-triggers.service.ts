import { Injectable, Logger } from "@nestjs/common";
import { AgreementTriggerRepository } from "./agreement-trigger.repository";
import { CreateAgreementTriggerDto, UpdateAgreementTriggerDto } from "./dto";
import { AgreementTrigger } from "./agreement-trigger.schema";
import { Types } from "mongoose";
import PaginationParams from "@/common/models/pagination.params.model";

@Injectable()
export class AgreementTriggerService {
  logger = new Logger();

  constructor(private readonly repository: AgreementTriggerRepository) {
    this.logger = new Logger(this.constructor.name);
  }

  async findOneByTxHash(hash: string): Promise<AgreementTrigger> {
    return this.repository.model.findOne({ txHash: hash}).exec()
  }

  async create(triggerData: CreateAgreementTriggerDto): Promise<AgreementTrigger> {
    try {
      return await this.repository.model.create(triggerData);
    } catch (e: any) {
      this.logger.error('create_agreement_trigger', { error: e.stack });
    }
    return null;
  }

  async createOrUpdate(triggerData: CreateAgreementTriggerDto, updateData: UpdateAgreementTriggerDto, hash: string) {
    let agreementTrigger = await this.findOneByTxHash(hash);

    if(!agreementTrigger) {
      agreementTrigger = await this.create(triggerData)
    }

    await this.repository.model.updateOne({ txHash: hash }, updateData)

    return agreementTrigger
  }

  async findAllAgreementTriggers(agreement: Types.ObjectId, pagination: PaginationParams = new PaginationParams()): Promise<AgreementTrigger[]>  {
    return await this.repository.model
      .find({ agreement: agreement})
      .skip(pagination.skip)
      .limit(pagination.limit)
      .sort({ _id: 'desc' });
  }
}
