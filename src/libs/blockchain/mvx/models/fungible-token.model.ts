import { Token } from './token.model';
import { MvxTokenType } from '../enums';

export class MvxFungibleToken extends Token {
  type = MvxTokenType.FungibleESDT;

  owner!: string;

  canBurn!: boolean;
  canChangeOwner!: boolean;
  canFreeze!: boolean;
  canMint!: boolean;
  canPause!: boolean;
  canUpgrade!: boolean;
  canWipe!: boolean;

  circulatingSupply!: string;

  burnt!: string;

  isPaused!: boolean;

  constructor(params: Partial<MvxFungibleToken> = {}) {
    super(params);
  }
}
