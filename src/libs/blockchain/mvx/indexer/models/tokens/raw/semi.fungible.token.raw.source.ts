import { EsdtTokenRawSource } from './esdt.token.raw.source';
import { SemiFungibleTokenData } from './semi.fungible.token.data';

export class SemiFungibleTokenRawSource extends EsdtTokenRawSource {
  identifier: string;
  tokenNonce: number;
  currentOwner: string;
  data: SemiFungibleTokenData;
}
