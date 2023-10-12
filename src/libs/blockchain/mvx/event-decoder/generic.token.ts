import BigNumber from 'bignumber.js';

export type GenericTokenType = {
  tokenIdentifier: string | undefined;
  nonce: number;
  amount: string | undefined;
};

export class GenericToken {
  tokenIdentifier: string | undefined;
  nonce = new BigNumber(0);
  amount: BigNumber | undefined;

  constructor(init?: Partial<GenericToken>) {
    Object.assign(this, init);
  }

  toJSON(): GenericTokenType {
    return {
      tokenIdentifier: this.tokenIdentifier,
      nonce: this.nonce.toNumber(),
      amount: this.amount?.toFixed(),
    };
  }
}
