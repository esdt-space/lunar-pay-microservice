import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { NativeAuthGuard } from "@multiversx/sdk-nestjs-auth";

import { MongooseObjectIdPipe } from "@/libs/database/mongo";

import { SubscriptionTriggerService } from "./subscription-triggers.service";
import PaginationParams from "@/common/models/pagination.params.model";

@ApiTags('Subscription Triggers')
@Controller('subscription-triggers')
export class SubscriptionTriggersController {
  constructor(private readonly subscriptionTriggersService: SubscriptionTriggerService) {}

  @Get(':id/all')
  @UseGuards(NativeAuthGuard)
  @ApiOperation({
    summary: 'Subscription triggers list',
    description: 'Returns a list of triggers for a specific subscription',
  })
  async list(
    @Param('id', MongooseObjectIdPipe) id,
    @Query('pagination') pagination: PaginationParams,
  ) {
    return this.subscriptionTriggersService.findAllSubscriptionTriggers(id, pagination);
  }
}
