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

import { UpdateAgreementDto } from './dto/update-agreement.dto';
import { PaymentAgreementsService } from './payment-agreements.service';
import { PaymentAgreementMembersService } from './payment-agreement-members.service';
import PaginationParams from '@/common/models/pagination.params.model';

@ApiTags('Payment Agreements')
@Controller('payment-agreements')
export class PaymentAgreementsController {
  constructor(
    private readonly agreementsService: PaymentAgreementsService,
    private readonly membersService: PaymentAgreementMembersService,
  ) {}

  @Get('created')
  @UseGuards(NativeAuthGuard)
  getAgreementsCreated(
    @NativeAuth('address') address: string,
    @Query() pagination: PaginationParams,
  ) {
    return this.agreementsService.findAgreementsCreatedByAccount(address, pagination);
  }

  @Get('created/latest')
  @UseGuards(NativeAuthGuard)
  getLatestAgreementCreated(@NativeAuth('address') address: string) {
    return this.agreementsService.findLatestAgreementCreatedByAccount(address);
  }

  @Get('signed')
  @UseGuards(NativeAuthGuard)
  getAgreementsSigned(@NativeAuth('address') address: string) {
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
  async getAgreement(@Param('id') id: string) {
    return this.agreementsService.findOneAgreementById(id);
  }

  @Get(':id/members')
  @UseGuards(NativeAuthGuard)
  async getAgreementMembers(
    @NativeAuth('address') address: string,
    @Param('id') id: string,
    @Query() pagination: PaginationParams,
    ) {
    return this.membersService.findAgreementMembers(id, pagination);
  }

  @Put(':id')
  @UseGuards(NativeAuthGuard)
  async updateAgreement(
    @NativeAuth('address') address: string,
    @Param('id') id: string,
    @Body() dto: UpdateAgreementDto,
  ) {
    return this.agreementsService.updateAgreementById(address, id, dto);
  }
}
