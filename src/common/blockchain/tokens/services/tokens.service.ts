import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MvxFungibleToken } from '@/libs/blockchain/mvx/models';

/** Local Imports **/
import { Repository } from 'typeorm';
import { Token } from '../entities';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)  private repository: Repository<Token>
  ) {}

  async findAll(): Promise<Token[]> {
    return this.repository.find();
  }

  async findOneByIdentifier(identifier: string): Promise<Token> {
    return this.repository.findOneBy({ identifier });
  }

  private setVerifiedByProps(token: MvxFungibleToken) {
    const tokenDocument = {
      ...token,
    } as Partial<Token>;

    if (this.isVerifiedByMultiversX(token)) {
      tokenDocument.verified = true;
    } else {
      tokenDocument.verified = false;
    }

    return tokenDocument;
  }

  async saveTokens(tokens: MvxFungibleToken[]): Promise<any> {
    const decoratedTokens = tokens.map((rawToken) => this.decorate(rawToken));

    return this.repository.upsert(
      decoratedTokens,
      { conflictPaths: ['identifier'], skipUpdateIfNoValuesChanged: true }
    );
  }

  private decorate(token: MvxFungibleToken) {
    return {
      name: token.name,
      identifier: token.identifier,
      ticker: token.ticker,
      decimals: token.decimals,
      assets: token.assets,
      owner: token.owner,
      balance: token.balance,
      price: token.price,
      verified: token.verified,

      rawData: token,
    } as Token;
  }

  private isVerifiedByMultiversX(token: MvxFungibleToken) {
    // eslint-disable-next-line no-prototype-builtins
    return token.hasOwnProperty('assets') && token.assets !== undefined;
  }
}
