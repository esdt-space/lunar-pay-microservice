import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Donation } from './donation.schema';
import { DonationRepository } from './donation.repository';
import { PaginatedResponse } from '@/common/models/paginated-response';
import { CreateDonationDto, UpdateDonationDto } from './dto';
import PaginationParams from '@/common/models/pagination.params.model';

@Injectable()
export class DonationsService {
  constructor(
    private readonly repository: DonationRepository,
    @InjectModel('Donation') private readonly donationModel: Model<Donation>
  ) {}

  async countUsersDonations() {
    const donationsCount = await this.donationModel.aggregate([
      { 
        $group: {
          _id: {
            userId: '$owner',
            type: '$type'
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.userId',
          actions: {
            $push: {
              type: 'donation-created',
              count: '$count',
            },
          },
        },
      },
    ])

    return donationsCount
  }

  async findOneDonationById(id: Types.ObjectId): Promise<Donation> {
    return this.repository.model.findOne({ _id: id });
  }

  async findDonationsCreatedByAccount(
    address: string,
    pagination: PaginationParams = new PaginationParams()
  ) {
    const donationsCount = await this.repository.model.find({ owner: address }).countDocuments({});

    const donationsList: Donation[] = await this.repository.model
      .find({ owner: address })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .sort({ createdAt: 'desc' })
      .lean();

    return new PaginatedResponse<Donation>(donationsList, donationsCount, pagination)
  }

  async findDonationsForEvent() {
    const total: Map<string, {amount: number; tokenIdentifier: string}> = new Map();

    const donationsList: Donation[] = await this.repository.model.find().lean();

    donationsList.forEach((item) => {
      const key = `${item.owner}-${item.tokenIdentifier}`;
      const amount = Number(item.totalAmount);

      if(!isNaN(amount)) {
        if (total.has(key)) {
          const existing = total.get(key);
          total.set(key, { amount: existing.amount + amount, tokenIdentifier: item.tokenIdentifier})
        } else {
          total.set(key, { amount: amount, tokenIdentifier: item.tokenIdentifier});
        }
      }
    })

    const result = [];
    total.forEach((value, key) => {
      const [owner] = key.split('-');
      result.push({owner, amount: value.amount.toString(), tokenIdentifier: value.tokenIdentifier})
    })

    const sortedDonations = result.sort((a,b) => b.amount - a.amount)

    return {
      data: sortedDonations,
      meta: {
        totalRecords: result.length
      }
    }
  }

  async createDonation(address: string, dto: CreateDonationDto): Promise<Donation> {
    return this.repository.model.create({
      ...dto,
      owner: address,
      totalAmount: '',
    });
  }

  async updateDonationById(
    address: string,
    id: string,
    dto: UpdateDonationDto,
  ): Promise<UpdateDonationDto> {
    return this.repository.model.findOneAndUpdate({ _id: id, owner: address }, {
      ...dto,
    });
  }
}
