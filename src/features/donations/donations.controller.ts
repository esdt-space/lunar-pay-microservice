import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller, Get, Param, Post, UseGuards,
} from '@nestjs/common';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';

import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto';
import { MongooseObjectIdPipe } from '@/libs/database/mongo';

@ApiTags('Donations')
@Controller('donations')
export class DonationsController {
  constructor(
    private readonly donationsService: DonationsService,
  ) {}

  @Get(':id')
  async getDonation(@Param('id', MongooseObjectIdPipe) id) {
    return this.donationsService.findOneDonationById(id);
  }

  @Get()
  @UseGuards(NativeAuthGuard)
  async getDonations(
    @NativeAuth('address') address: string,
  ) {
    return this.donationsService.findDonationsCreatedByAccount(address);
  }

  @Post()
  @UseGuards(NativeAuthGuard)
  async createDonation(
    @NativeAuth('address') address: string,
    @Body() dto: CreateDonationDto,
  ) {
    return this.donationsService.createDonation(address, dto);
  }
}
