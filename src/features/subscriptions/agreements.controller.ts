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
import { AgreementsService } from './services/agreements.service';
import { MongooseObjectIdPipe } from '@/libs/database/mongo';
import { AgreementDto } from './dto/agreement.dto';

@ApiTags('Agreements')
@Controller('agreements')
export class AgreementsController {
  constructor(private readonly agreementsService: AgreementsService) {}

  @Get()
  @UseGuards(NativeAuthGuard)
  getAccountAgreements(@NativeAuth('address') address: string) {
    console.debug(address);

    return this.agreementsService.findAccountAgreements(address);
  }

  @Post()
  @UseGuards(NativeAuthGuard)
  createNewAgreement(
    @NativeAuth('address') address: string,
    @Body() dto: AgreementDto,
  ) {
    console.debug(address);

    return this.agreementsService.createAgreement(address, dto);
  }

  @Get(':id')
  @UseGuards(NativeAuthGuard)
  async getAgreement(
    @NativeAuth('address') address: string,
    @Param('id', MongooseObjectIdPipe) id,
  ) {
    console.debug(address);

    return this.agreementsService.findOneAgreementById(id);
  }

  @Delete(':id')
  @UseGuards(NativeAuthGuard)
  async deleteAgreement(
    @NativeAuth('address') address: string,
    @Param('id', MongooseObjectIdPipe) id,
  ) {
    console.debug(address);

    return this.agreementsService.deleteOneAgreementById(id);
  }
}
