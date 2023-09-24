import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MvxFungibleToken } from '@/libs/blockchain/mvx/models';

@Injectable()
export class BlockchainTokensService {
  private static ITEMS_PER_PAGE = 5000;
  private readonly apiUrl: string;

  constructor(private readonly config: ConfigService) {
    this.apiUrl = this.config.get('urls').blockchainApi;
  }

  async getNumberOfEsdtTokensPages(): Promise<number> {
    return axios.get(`${this.apiUrl}/tokens/count`).then((response) => {
      return Math.ceil(
        (response.data as number) / BlockchainTokensService.ITEMS_PER_PAGE,
      );
    });
  }

  async getEsdtTokens(pageNumber: number): Promise<MvxFungibleToken[]> {
    const from = (pageNumber - 1) * BlockchainTokensService.ITEMS_PER_PAGE;

    return axios
      .get(
        `${this.apiUrl}/tokens?from=${from}&size=${BlockchainTokensService.ITEMS_PER_PAGE}`,
      )
      .then((response) => response.data)
      .then((tokens: MvxFungibleToken[]) =>
        tokens.map((token) => new MvxFungibleToken(token)),
      );
  }

  async getExchangeTokensPrices(): Promise<any> {
    return axios.get(`${this.apiUrl}/mex/tokens?size=100`);
  }
}
