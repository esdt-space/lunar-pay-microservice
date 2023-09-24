import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UacEventsHandler } from './uac-events.handler';

import { UacService } from './uac.service';
import { UacRepository } from './uac.repository';
import {
  UniqueAgreementIdentifier,
  UniqueAgreementIdentifierSchema,
} from './uac.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UniqueAgreementIdentifier.name,
        schema: UniqueAgreementIdentifierSchema,
      },
    ]),
  ],
  providers: [UacService, UacRepository, UacEventsHandler],
  exports: [UacService, UacEventsHandler],
})
export class UacModule {}
