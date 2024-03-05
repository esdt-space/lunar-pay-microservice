import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/libs/database/mongo';
import { Donation } from './donation.schema';

@Injectable()
export class DonationRepository extends AbstractRepository<Donation> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(Donation.name) model: Model<Donation>,
  ) {
    super(model, connection);
  }
}
