import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import {
  AddressValue,
  SmartContract,
  TokenIdentifierValue,
  VariadicValue,
} from '@multiversx/sdk-core/out';

import { getContractFromAbi } from '@/libs/blockchain/mvx/contract';
import { ContractQueryHandler } from '@/libs/blockchain/mvx/contract/contract-query.handler';

import vaultAbi from './abi/lunar-pay.abi.json';

@Injectable()
export class VaultService {
  contract: SmartContract;
  logger = new Logger();

  constructor(
    private readonly configService: ConfigService,
    private readonly queryHandler: ContractQueryHandler,
  ) {
    this.contract = getContractFromAbi(
      this.configService.get('contracts.lunarPayVault'),
      vaultAbi,
    );
  }

  async getWhitelistedTokens(): Promise<any> {
    return this.queryHandler
      .queryContract(this.contract, 'getWhitelistedTokenIds')
      .then((response) => {
        const firstValue = response.firstValue as VariadicValue;

        return firstValue
          .getItems()
          .map((item: TokenIdentifierValue) => item.toString());
      })
      .catch((err) => {
        this.logger.log('Unable to call getWhitelistedTokens', err);

        throw Error(err);
      });
  }

  async getWhitelistedAddresses(): Promise<string[]> {
    return this.queryHandler
      .queryContract(this.contract, 'getWhitelistedAddresses')
      .then((response) => {
        const firstValue = response.firstValue as VariadicValue;

        return firstValue
          .getItems()
          .map((item: AddressValue) => item.valueOf().toString());
      })
      .catch((err) => {
        this.logger.log('Unable to call getWhitelistedAddresses', err);

        throw Error(err);
      });
  }
}
