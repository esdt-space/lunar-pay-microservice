import { Injectable, Logger } from "@nestjs/common";
import { AgreementTriggerRepository } from "./agreement-trigger.repository";
import { CreateAgreementTriggerDto } from "./dto";
import { AgreementTrigger } from "./agreement-trigger.schema";
import { Types } from "mongoose";
import PaginationParams from "@/common/models/pagination.params.model";

@Injectable()
export class AgreementTriggerService {
  logger = new Logger();

  constructor(private readonly repository: AgreementTriggerRepository) {
    this.logger = new Logger(this.constructor.name);
  }

  async create(triggerData: CreateAgreementTriggerDto): Promise<AgreementTrigger> {
    try {
      return await this.repository.model.create(triggerData);
    } catch (e: any) {
      this.logger.error('create_agreement_trigger', { error: e.stack });
    }
    return null;
  }

  async updateAgreementTrigger(id: Types.ObjectId, amount: string, isSuccessfulCharge: boolean) {
    const successfulCharge = { $set: { successfulChargeAmount: amount } };
    const failedCharge = { $set: { failedChargeAmount: amount } };

    const update = isSuccessfulCharge ? successfulCharge : failedCharge;

    return this.repository.model.updateOne({ _id: id }, update)
  }

  async findAllAgreementTriggers(agreement: Types.ObjectId, pagination: PaginationParams = new PaginationParams()): Promise<AgreementTrigger[]>  {
    return await this.repository.model
      .find({ agreement: agreement})
      .skip(pagination.skip)
      .limit(pagination.limit)
      .sort({ _id: 'desc' });
  }
}
