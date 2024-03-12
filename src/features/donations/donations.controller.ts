import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller, Get, Param, Post, Put, UseGuards,
} from '@nestjs/common';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';

import { DonationsService } from './donations.service';
import { CreateDonationDto, UpdateDonationDto, CreateDonationWidgetDto } from './dto';
import { MongooseObjectIdPipe } from '@/libs/database/mongo';
import { DonationWidgetsService } from './donation-widgets.service';

@ApiTags('Donations')
@Controller('donations')
export class DonationsController {
  constructor(
    private readonly donationsService: DonationsService,
    private readonly donationWidgetsService: DonationWidgetsService,
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

  @Get('event/donations-ranked')
  @UseGuards(NativeAuthGuard)
  async testing(
    @NativeAuth('address') address: string,
  ) {
    return this.donationsService.findDonationsForEvent();
  }

  @Post()
  @UseGuards(NativeAuthGuard)
  async createDonation(
    @NativeAuth('address') address: string,
    @Body() dto: CreateDonationDto,
  ) {
    return this.donationsService.createDonation(address, dto);
  }

  @Put(':id')
  @UseGuards(NativeAuthGuard)
  async updateDonation(
    @NativeAuth('address') address: string,
    @Param('id', MongooseObjectIdPipe) id,
    @Body() dto: UpdateDonationDto,
  ) {
    return this.donationsService.updateDonationById(address, id, dto);
  }

  @Post('widgets')
  @UseGuards(NativeAuthGuard)
  async createDonationWidget(
    @NativeAuth('address') address: string,
    @Body() dto: CreateDonationWidgetDto,
  ) {
    return this.donationWidgetsService.createDonationWidget(address, dto);
  }
}
