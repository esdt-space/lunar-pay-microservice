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

import { MongooseObjectIdPipe } from '@/libs/database/mongo';

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

  @Get('created/latest')
  @UseGuards(NativeAuthGuard)
  getLatestSubscriptionCreated(@NativeAuth('address') address: string) {
    return this.subscriptionsService.findLatestSubscriptionCreatedByAccount(address);
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
    @Param('id', MongooseObjectIdPipe) id,
    ) {
      return this.membersService.findMembership(id, address);
  }

  @Get(':id')
  async getSubscription(@Param('id', MongooseObjectIdPipe) id) {
    return this.subscriptionsService.findOneSubscriptionById(id);
  }

  @Get(':id/members')
  @UseGuards(NativeAuthGuard)
  async getSubscriptionMembers(
    @NativeAuth('address') address: string,
    @Param('id', MongooseObjectIdPipe) id,
    @Query() pagination: PaginationParams,
    ) {
    return this.membersService.findSubscriptionMembers(id, pagination);
  }

  @Put(':id')
  @UseGuards(NativeAuthGuard)
  async updateSubscription(
    @NativeAuth('address') address: string,
    @Param('id', MongooseObjectIdPipe) id,
    @Body() dto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionsService.updateSubscriptionById(address, id, dto);
  }
}
