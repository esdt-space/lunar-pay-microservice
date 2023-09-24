import { TokenTypeEnum } from '../../../token';

import { QueryHitItem } from '../es';
import { FungibleTokenRawSource } from './raw';

export class FungibleToken {
  address: string;
  balanceString: string;
  balanceNumber: number;
  identifier: string;
  type: TokenTypeEnum = TokenTypeEnum.Fungible;

  static fromQueryHit(props: QueryHitItem<FungibleTokenRawSource>) {
    const model = new FungibleToken();
    const { address, token, balance, balanceNum } = props._source;

    model.address = address;
    model.identifier = token;
    model.balanceString = balance;
    model.balanceNumber = balanceNum;

    return model;
  }
}
