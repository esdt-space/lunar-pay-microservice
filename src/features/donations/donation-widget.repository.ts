import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/libs/database/mongo';
import { DonationWidget } from './donation-widget.schema';

@Injectable()
export class DonationWidgetRepository extends AbstractRepository<DonationWidget> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(DonationWidget.name) model: Model<DonationWidget>,
  ) {
    super(model, connection);
  }
}
