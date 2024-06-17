import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';

import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionMembersService } from './subscription-members.service';
import PaginationParams from '@/common/models/pagination.params.model';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly membersService: SubscriptionMembersService,
  ) {}

  @Get('created')
  @UseGuards(NativeAuthGuard)
  getSubscriptionsCreated(
    @NativeAuth('address') address: string,
    @Query() pagination: PaginationParams,
  ) {
    return this.subscriptionsService.findSubscriptionsCreatedByAccount(address, pagination);
  }

  @Get('created/latest/:identifier')
  @UseGuards(NativeAuthGuard)
  getLatestSubscriptionCreated(
    @NativeAuth('address') address: string,
    @Param('identifier') identifier: number
  ) {
    return this.subscriptionsService.findLatestSubscriptionCreatedByAccount(address, identifier);
  }

  @Get('signed')
  @UseGuards(NativeAuthGuard)
  getSubscriptionsSigned(@NativeAuth('address') address: string) {
    return this.membersService.findAddressMemberships(address);
  }

  @Get('signed/:id')
  @UseGuards(NativeAuthGuard)
  getMembership(
    @NativeAuth('address') address: string, 
    @Param('id') id: string,
    ) {
      return this.membersService.findMembership(id, address);
  }

  @Get(':id')
  async getSubscription(@Param('id') id: string) {
    return this.subscriptionsService.findOneSubscriptionById(id);
  }

  @Get(':id/members')
  @UseGuards(NativeAuthGuard)
  async getSubscriptionMembers(
    @NativeAuth('address') address: string,
    @Param('id') id: string,
    @Query() pagination: PaginationParams,
    ) {
    return this.membersService.findSubscriptionMembers(id, pagination);
  }

  @Get(':id/members/all')
  @UseGuards(NativeAuthGuard)
  async getAllSubscriptionMemberships(
    @Param('id') id: string,
    ) {
    return this.membersService.findAllSubscriptionMemberships(id);
  }

  @Put(':id')
  @UseGuards(NativeAuthGuard)
  async updateSubscription(
    @NativeAuth('address') address: string,
    @Param('id') id: string,
    @Body() dto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionsService.updateSubscriptionById(address, id, dto);
  }
}
