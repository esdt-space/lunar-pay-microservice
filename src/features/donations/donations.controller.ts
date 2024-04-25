import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller, Get, Param, Post, Put, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';

import { DonationsService } from './donations.service';
import { CreateDonationDto, UpdateDonationDto, CreateDonationWidgetDto } from './dto';
import { DonationWidgetsService } from './donation-widgets.service';
import { DurationConstants } from '@/utils/time/duration-constants';

@ApiTags('Donations')
@Controller('donations')
export class DonationsController {
  constructor(
    private readonly donationsService: DonationsService,
    private readonly donationWidgetsService: DonationWidgetsService,
  ) {}

  @Get(':id')
  async getDonation(@Param('id') id: string) {
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
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(DurationConstants.oneSecond() * 10)
  async getDonationsForEvent() {
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
    @Param('id') id: string,
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
