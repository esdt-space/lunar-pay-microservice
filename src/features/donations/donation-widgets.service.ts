import { Injectable } from '@nestjs/common';

import { DonationWidgetRepository } from './donation-widget.repository';
import { CreateDonationWidgetDto } from './dto/donations-widget.dto';
import { DonationWidget } from './donation-widget.schema';

@Injectable()
export class DonationWidgetsService {
  constructor(private readonly repository: DonationWidgetRepository) {}

  async createDonationWidget(address: string, dto: CreateDonationWidgetDto): Promise<DonationWidget> {
    return this.repository.model.create({
      ...dto,
      owner: address,
    });
  }
}
