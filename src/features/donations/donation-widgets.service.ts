import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DonationWidget } from './entities';
import { CreateDonationWidgetDto } from './dto';

@Injectable()
export class DonationWidgetsService {
  constructor(
    @InjectRepository(DonationWidget)  private readonly repository: Repository<DonationWidget>
  ) {}

  async createDonationWidget(address: string, dto: CreateDonationWidgetDto) {
    const donationWidget = this.repository.create({
      ...dto,
      owner: address,
      createdAt: new Date(Date.now())
    });

    return this.repository.save(donationWidget);
  }
}
