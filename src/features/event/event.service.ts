import { Injectable } from "@nestjs/common";

import { DonationsService } from "../donations/donations.service";
import { TokenOperationService } from "../token-operations/token-operation.service";
import { PaymentAgreementsService } from "../payment-agreements/payment-agreements.service";
import { mergeActionCounts } from "./utils";

@Injectable()
export class EventService {
  constructor(
    private readonly donationsService: DonationsService,
    private readonly tokenOperationsService: TokenOperationService,
    private readonly paymentAgreementsService: PaymentAgreementsService,
  ) {}

  async findUsersActions() {
    const donationsCount = await this.donationsService.countUsersDonations()
    const tokenOperationsCount = await this.tokenOperationsService.countUsersTokenOperations()
    const agreementsCount = await this.paymentAgreementsService.countUsersAgreements()

    const result = mergeActionCounts([donationsCount, agreementsCount, tokenOperationsCount])
    const sortedResult = result.filter(item => item._id !== null).sort((a,b) => b.allActions - a.allActions)
    const totalRecords = sortedResult.length

    return {
      data: sortedResult,
      meta: {
        totalRecords: totalRecords
      }
    }
  }
}
