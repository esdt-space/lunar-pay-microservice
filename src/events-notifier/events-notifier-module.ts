import { Module } from '@nestjs/common';

import { EventsConsumerService } from './events-consumer.service';

import { UacModule } from '@/features/uac/uac.module';

@Module({
  imports: [UacModule],
  providers: [EventsConsumerService],
})
export class EventsNotifierModule {}
