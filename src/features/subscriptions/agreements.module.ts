import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgreementEntity, AgreementSchema } from './schemas/agreement.entity';
import { AgreementsService } from './services/agreements.service';
import { AgreementsRepository } from './repositories/agreements.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AgreementEntity.name, schema: AgreementSchema },
    ]),
  ],
  providers: [AgreementsService, AgreementsRepository],
  exports: [AgreementsService, AgreementsRepository],
})
export class AgreementsModule {}
