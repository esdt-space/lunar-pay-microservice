import { Injectable } from '@nestjs/common';

import { MvxAccountService } from '@/libs/blockchain/mvx/account';

@Injectable()
export class AccountTokensService {
  constructor(private readonly mvxAccountService: MvxAccountService) {}

  async getEsdtTokens(address: string): Promise<any> {
    return this.mvxAccountService.getAccountEsdtTokensFromApi(address);
  }
}
