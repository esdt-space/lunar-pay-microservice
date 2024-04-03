import { Connection, Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/libs/database/mongo';

import { PaymentAgreementMember } from './payment-agreement-member.schema';
import { CreateAgreementMemberDto } from './dto';

@Injectable()
export class PaymentAgreementMemberRepository extends AbstractRepository<PaymentAgreementMember> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(PaymentAgreementMember.name) model: Model<PaymentAgreementMember>,
  ) {
    super(model, connection);
  }

  async findMembershipsByAddress(address: string) {
    return await this.model.find({member: address});
  }

  async getAgreementsByIdsCount(agreementIds: Types.ObjectId[]) {
    return await this.model.find({ _id: { $in: agreementIds } }).countDocuments({});
  }

  async findMembersCountById(id: Types.ObjectId) {
    return await this.model.find({ internalAgreementId: id }).countDocuments({});
  }

  async findMembershipByIdAndAddress(id: Types.ObjectId, address: string) {
    return await this.model.findOne({ internalAgreementId: id, member: address });
  }

  async updateLastMembershipCharged(member: string, date: Date){
    const newCharge = { $set: { lastSuccessfulCharge: date } };

    return this.model.updateOne({ member: member }, newCharge);
  }

  async createNewMembership(dto: CreateAgreementMemberDto) {
    return this.model.create({
      ...dto,
      lastChargedAt: dto.createdAt,
      lastSuccessfulCharge: dto.createdAt,
    });
  }
}
