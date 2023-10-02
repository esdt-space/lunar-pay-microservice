import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';
import { SubscriptionsService } from './services/subscriptions.service';
import { MongooseObjectIdPipe } from '@/libs/database/mongo';
import { SubscriptionDto } from './dto/subscription.dto';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  @UseGuards(NativeAuthGuard)
  getAccountSubscriptions(@NativeAuth('address') address: string) {
    console.debug(address);

    return this.subscriptionsService.findAllSubscriptions();
  }

  @Post()
  @UseGuards(NativeAuthGuard)
  create(
    @NativeAuth('address') address: string,
    @Param('id', MongooseObjectIdPipe) id,
    @Body() dto: SubscriptionDto,
  ) {
    console.debug(address);

    return this.subscriptionsService.createSubscription(id, dto);
  }

  @Get(':id')
  @UseGuards(NativeAuthGuard)
  async getOneSubscriptionById(
    @NativeAuth('address') address: string,
    @Param('id', MongooseObjectIdPipe) id,
  ) {
    console.debug(address);

    return this.subscriptionsService.findOneSubscriptionById(id);
  }

  @Delete(':id')
  @UseGuards(NativeAuthGuard)
  async deleteOneSubscriptionById(
    @NativeAuth('address') address: string,
    @Param('id', MongooseObjectIdPipe) id,
  ) {
    console.debug(address);

    return this.subscriptionsService.deleteOneSubscriptionById(id);
  }
}
