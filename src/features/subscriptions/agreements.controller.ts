import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';
import { AgreementsService } from './services/agreements.service';
import { MongooseObjectIdPipe } from '@/libs/database/mongo';
import { UpdateAgreementDto } from './dto/agreement.dto';

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

  // TO DO: Remove create after SC implementation
  @Post()
  @UseGuards(NativeAuthGuard)
  createNewAgreement(@NativeAuth('address') address: string, @Body() dto: any) {
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

  @Put(':id')
  @UseGuards(NativeAuthGuard)
  async updateAgreement(
    @NativeAuth('address') address: string,
    @Param('id', MongooseObjectIdPipe) id,
    @Body() dto: UpdateAgreementDto,
  ) {
    console.debug(address);

    return this.agreementsService.updateAgreementById(address, id, dto);
  }
}
