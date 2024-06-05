import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { ApiTags } from "@nestjs/swagger";

import { EventService } from "./event.service";

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
  ) {}

  @Get('actions')
  @UseInterceptors(CacheInterceptor)
  async getDonationsForEvent() {
    return this.eventService.findUsersActions();
  }
}
