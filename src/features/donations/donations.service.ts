import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginatedResponse } from '@/common/models/paginated-response';
import PaginationParams from '@/common/models/pagination.params.model';
import { Donation } from './entities';
import { CreateDonationDto, UpdateDonationDto } from './dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)  private readonly repository: Repository<Donation>
  ) {}

  async countUsersDonations() {
    const donationsCount = await this.repository.query(`
      SELECT
        owner AS "userId",
        JSON_AGG(JSON_BUILD_OBJECT('type', 'donation-created', 'count', count)) AS actions,
        SUM(count) AS "allActions"
      FROM (
        SELECT
          owner,
          'donation-created' AS type,
          COUNT(*) AS count
        FROM
          donation
        GROUP BY
          owner
      ) AS grouped_donations
      GROUP BY
        owner
    `);
  
    return donationsCount.map(row => ({
      userId: row.userId,
      actions: row.actions,
      allActions: parseInt(row.allActions, 10)
    }));
  };

  async findDonationsForEvent() {
    const donationsList = await this.repository.find();

    const total: Map<string, {amount: number}> = new Map();

    donationsList.forEach((item) => {
      const key = `${item.owner}`;
      const amount = Number(item.totalAmount);

      if (!isNaN(amount)) {
        if (total.has(key)) {
          const existing = total.get(key);
          total.set(key, { amount: existing.amount + amount});
        } else {
          total.set(key, { amount: amount});
        }
      }
    });

    const result = [];
    total.forEach((value, key) => {
      const [owner] = key.split('-');
      result.push({ owner, amount: value.amount.toString() });
    });

    const sortedDonations = result.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));

    return {
      data: sortedDonations,
      meta: {
        totalRecords: result.length
      }
    };
  }

  async findOneDonationById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findOneDonationByAccount(owner: string) {
    return this.repository.findOneBy({ owner });
  }

  async findDonationsCreatedByAccount(
    address: string,
    pagination: PaginationParams = new PaginationParams()
  ) {
    const [donationsList, donationsCount] = await this.repository.findAndCount({
      where: { owner: address },
      take: pagination.limit,
      skip: pagination.skip,
      order: { createdAt: 'DESC' },
    });

    return new PaginatedResponse<Donation>(donationsList, donationsCount, pagination);
  }


  async createDonation(address: string, dto: CreateDonationDto) {
    const donation = this.repository.create({
      ...dto,
      owner: address,
    });

    donation.createdAt = new Date()

    return this.repository.save(donation);
  }

  async updateDonationById(
    address: string,
    id: string,
    dto: UpdateDonationDto,
  ): Promise<Donation> {
    await this.repository.update(id, { ...dto, owner: address });

    return this.repository.findOneBy({ id });
  }
}
