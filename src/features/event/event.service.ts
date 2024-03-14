import { Injectable } from "@nestjs/common";

import { DonationsService } from "../donations/donations.service";
import { TokenOperationService } from "../token-operations/token-operation.service";
import { PaymentAgreementsService } from "../payment-agreements/payment-agreements.service";

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

    return {
      data: {
        donationsCount: donationsCount,
        tokenOperationsCount: tokenOperationsCount,
        agreementsCount: agreementsCount
      }
    }
  }
}
