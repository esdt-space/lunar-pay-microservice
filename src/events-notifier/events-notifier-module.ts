import { Module } from '@nestjs/common';

import { EventsNotifierService } from './events-notifier.service';

import { TokenOperationModule } from '@/features/token-operations/token-operation.module';

@Module({
  imports: [TokenOperationModule],
  providers: [EventsNotifierService],
})
export class EventsNotifierModule {}
