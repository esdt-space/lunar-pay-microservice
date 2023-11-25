import { Types } from 'mongoose';

export class CreateAgreementTriggerDto {
  agreement: Types.ObjectId;
  txHash?: string
}
