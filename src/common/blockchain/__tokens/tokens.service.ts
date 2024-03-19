import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MvxFungibleToken } from '@/libs/blockchain/mvx/models';

/** Local Imports **/
import { Token } from './entities';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)  private tokenRepository: Repository<Token>,
    // private readonly repository: TokenRepository
  ) {}

  async findAll(): Promise<Token[]> {
    return this.tokenRepository.find();
  }

  async findOneByIdentifier(identifier: string): Promise<Token> {
    return this.tokenRepository.findOneBy({ identifier });
  }

  async saveTokens(tokens: MvxFungibleToken[]): Promise<any> {
    const decoratedTokens = tokens.map((rawToken) => this.decorate(rawToken));

    return this.tokenRepository.upsert(
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
}
