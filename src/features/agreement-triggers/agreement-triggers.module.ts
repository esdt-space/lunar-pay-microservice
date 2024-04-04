import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgreementTriggerService } from './agreement-triggers.service';
import { AgreementTrigger } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgreementTrigger]),
  ],
  providers: [
    AgreementTriggerService
  ],
  exports: [
    AgreementTriggerService
  ],
})
export class AgreementTriggerModule {}
