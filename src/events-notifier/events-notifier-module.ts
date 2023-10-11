import { Module } from '@nestjs/common';

import { EventsConsumerService } from './events-consumer.service';

import { UacModule } from '@/features/uac/uac.module';
import { TransactionModule } from '@/features/transactions/transaction.module';

@Module({
  imports: [UacModule, TransactionModule],
  providers: [EventsConsumerService],
})
export class EventsNotifierModule {}
