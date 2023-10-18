import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';

import { MongooseClassSerializer } from '@/libs/database/mongo';
import BaseController from '@/core/controllers/base.controller';

import { UacService } from './uac.service';
import { UniqueAgreementIdentifier } from './uac.schema';

@ApiTags('Subscriptions')
@Controller('payment-agreements')
@UseInterceptors(MongooseClassSerializer(UniqueAgreementIdentifier))
export class UacController extends BaseController {
  constructor(private readonly uacService: UacService) {
    super();
  }

  @Get()
  @UseGuards(NativeAuthGuard)
  getAddressUACs(@NativeAuth('address') address: string) {
    return this.uacService.findAllAddressUACs(address);
  }
}
