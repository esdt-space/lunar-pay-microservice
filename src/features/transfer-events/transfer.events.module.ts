import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  TransferEvents,
  TransferEventsSchema,
} from './schemas/transfer.events.schema';
import { TransferEventsRepository } from './repositories/transfer.events.repository';
import { TransferEventsService } from './services/transfer.events.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransferEvents.name, schema: TransferEventsSchema },
    ]),
  ],
  providers: [TransferEventsService, TransferEventsRepository],
  exports: [
    TransferEventsService,
    MongooseModule.forFeature([
      { name: TransferEvents.name, schema: TransferEventsSchema },
    ]),
  ],
})
export class TransferEventsModule {}
