import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EventService } from "./event.service";

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
  ) {}

  @Get('actions')
  async getDonationsForEvent() {
    return this.eventService.findUsersActions();
  }
}
