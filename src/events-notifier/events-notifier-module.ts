import { Module } from '@nestjs/common';

import { EventsNotifierService } from './events-notifier.service';

@Module({
  providers: [EventsNotifierService],
})
export class EventsNotifierModule {}
