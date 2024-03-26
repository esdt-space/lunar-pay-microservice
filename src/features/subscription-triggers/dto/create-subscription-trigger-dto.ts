import { Types } from 'mongoose';

export class CreateSubscriptionTriggerDto {
  subscription: Types.ObjectId;
  txHash?: string
}
