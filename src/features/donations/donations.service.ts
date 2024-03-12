import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { Donation } from './donation.schema';
import { DonationRepository } from './donation.repository';
import { PaginatedResponse } from '@/common/models/paginated-response';
import { CreateDonationDto, UpdateDonationDto } from './dto';
import PaginationParams from '@/common/models/pagination.params.model';

@Injectable()
export class DonationsService {
  constructor(private readonly repository: DonationRepository) {}

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
    const total: Map<string, number> = new Map();

    const donationsList: Donation[] = await this.repository.model.find().lean();

    donationsList.forEach((item) => {
      const amount = parseFloat(item.totalAmount);

      if(!isNaN(amount)) {
        if (total.has(item.owner)) {
          total.set(item.owner, total.get(item.owner)! + amount)
        } else {
          total.set(item.owner, amount);
        }
      }
    })

    const result = [];
    total.forEach((amount, owner) => {
      result.push({owner, amount: amount.toString()})
    })

    return {
      data: result,
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
