import { CacheTTL, Controller, Get, UseInterceptors } from "@nestjs/common";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { ApiTags } from "@nestjs/swagger";

import { EventService } from "./event.service";
import { DurationConstants } from "@/utils/time/duration-constants";

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
  ) {}

  @Get('actions')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(DurationConstants.oneSecond() * 10)
  async getDonationsForEvent() {
    return this.eventService.findUsersActions();
  }
}
