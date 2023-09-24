import { MvxTokenType } from '@/libs/blockchain/mvx/enums';

type TokenAssets = {
  description?: string;
  website?: string;
  svgUrl?: string;
  pngUrl?: string;
};

type TokenSocial = {
  coingecko?: string;
  coinmarketcap?: string;
  discord?: string;
  email?: string;
  telegram?: string;
  twitter?: string;
};

export class Token {
  type!: MvxTokenType;

  name = '';
  identifier = '';
  ticker!: string;
  decimals!: number;

  balance!: string;
  verified = false;

  description: string | undefined = undefined;

  assets: TokenAssets = {};

  social: TokenSocial = {};

  isEsdt: boolean;
  isMetaEsdt: boolean;
  isSemiFungible: boolean;
  isNonFungible: boolean;

  hasAssetImage: boolean;

  assetImageUrl?: string;

  marketCap?: number;
  price?: number;

  constructor(params: Partial<Token> = {}) {
    Object.assign(this, params);

    this.hasAssetImage =
      this.assets.pngUrl !== undefined || this.assets.svgUrl !== undefined;

    this.isEsdt = this.type === MvxTokenType.FungibleESDT;
    this.isMetaEsdt = this.type === MvxTokenType.MetaESDT;
    this.isSemiFungible = this.type === MvxTokenType.SemiFungibleESDT;
    this.isNonFungible = this.type === MvxTokenType.NonFungibleESDT;

    this.description = this.assets.description ?? undefined;
    this.assetImageUrl = this.assets.svgUrl ?? this.assets.pngUrl;
  }
}
