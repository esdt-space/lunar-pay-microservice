import { Injectable } from "@nestjs/common";

import { DonationsService } from "../donations/donations.service";
import { TokenOperationService } from "../token-operations/token-operation.service";
import { SubscriptionsService } from "../subscriptions/subscriptions.service";
import { mergeActionCounts } from "./utils";

@Injectable()
export class EventService {
  constructor(
    private readonly donationsService: DonationsService,
    private readonly tokenOperationsService: TokenOperationService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  async findUsersActions(){
    const donationsCount = await this.donationsService.countUsersDonations();
    const tokenOperationsCount = await this.tokenOperationsService.countUsersTokenOperations();
    const subscriptionsCount = await this.subscriptionsService.countUsersSubscriptions();

    const result = mergeActionCounts([donationsCount, subscriptionsCount, tokenOperationsCount])
    const sortedResult = result.filter(item => item.userId !== null).sort((a,b) => b.allActions - a.allActions)
    const totalRecords = sortedResult.length

    return {
      data: sortedResult,
      meta: {
        totalRecords: totalRecords
      }
    }
  }
}
