import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  @Get()
  @UseGuards(NativeAuthGuard)
  getAccountSubscriptions(@NativeAuth('address') address: string) {
    console.debug(address);
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
