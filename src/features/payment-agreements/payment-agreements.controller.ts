import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';

import { MongooseObjectIdPipe } from '@/libs/database/mongo';

import { UpdateAgreementDto } from './dto/update-agreement.dto';
import { PaymentAgreementsService } from './payment-agreements.service';

@ApiTags('Payment Agreements')
@Controller('payment-agreements')
export class PaymentAgreementsController {
  constructor(private readonly agreementsService: PaymentAgreementsService) {}

  @Get('created')
  @UseGuards(NativeAuthGuard)
  getAgreementsCreated(@NativeAuth('address') address: string) {
    return this.agreementsService.findAccountAgreements(address);
  }

  @Get('signed')
  @UseGuards(NativeAuthGuard)
  getAgreementsSigned(@NativeAuth('address') address: string) {
    return this.agreementsService.findAccountAgreements(address);
  }

  // TO DO: Remove create after SC implementation
  @Post()
  @UseGuards(NativeAuthGuard)
  createNewAgreement(@NativeAuth('address') address: string, @Body() dto: any) {
    return this.agreementsService.createAgreement(address, dto);
  }

  @Get(':id')
  @UseGuards(NativeAuthGuard)
  async getAgreement(
    @NativeAuth('address') address: string,
    @Param('id', MongooseObjectIdPipe) id,
  ) {
    return this.agreementsService.findOneAgreementById(id);
  }

  @Put(':id')
  @UseGuards(NativeAuthGuard)
  async updateAgreement(
    @NativeAuth('address') address: string,
    @Param('id', MongooseObjectIdPipe) id,
    @Body() dto: UpdateAgreementDto,
  ) {
    return this.agreementsService.updateAgreementById(address, id, dto);
  }
}
