import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';

@Injectable()
export class MvxAccountService {
  private readonly url: string;
  private readonly apiUrl: string;

  constructor(private readonly config: ConfigService) {
    this.url = this.config.get('urls').gatewayHost;
    this.apiUrl = this.config.get('urls').blockchainApi;
  }

  async getAccountInformation(address: string): Promise<any> {
    return axios
      .get(`${this.url}/address/${address}`)
      .then((response) => response.data);
  }

  async getAccountEsdtTokens(address: string): Promise<any[]> {
    return axios
      .get(`${this.url}/address/${address}/esdt`)
      .then((response) => response.data);
  }

  async getAccountEsdtTokensFromApi(address: string): Promise<any[]> {
    return axios
      .get(
        `${this.apiUrl}/accounts/${address}/tokens?size=5000&type=FungibleESDT`,
      )
      .then((response) => response.data);
  }
}
