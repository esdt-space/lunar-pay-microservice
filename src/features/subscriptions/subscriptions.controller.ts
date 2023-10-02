import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';
import { SubscriptionsService } from './services/subscriptions.service';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  @UseGuards(NativeAuthGuard)
  getAccountSubscriptions(@NativeAuth('address') address: string) {
    console.debug(address);
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  @UseGuards(NativeAuthGuard)
  async getOneById(
    @NativeAuth('address') address: string,
    @Param('id') id: string,
  ) {
    console.debug(address);
  }
}
