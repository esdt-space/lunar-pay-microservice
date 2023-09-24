import { TokenTypeEnum } from '../../../../token';

export class EsdtTokenRawSource {
  address: string;
  balance: string;
  balanceNum: number;
  shardID: number;
  type: TokenTypeEnum;
  token: string;
  timestamp: number;
}
