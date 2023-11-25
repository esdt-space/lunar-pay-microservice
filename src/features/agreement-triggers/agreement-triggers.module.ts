import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AgreementTrigger, AgreementTriggerSchema } from './agreement-trigger.schema';
import { AgreementTriggerRepository } from './agreement-trigger.repository';
import { AgreementTriggerService } from './agreement-triggers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AgreementTrigger.name, schema: AgreementTriggerSchema },
    ]),
  ],
  providers: [
    AgreementTriggerRepository,
    AgreementTriggerService
  ],
  exports: [
    AgreementTriggerRepository,
    AgreementTriggerService
  ],
})
export class AgreementTriggerModule {}
