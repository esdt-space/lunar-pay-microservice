import { Injectable } from '@nestjs/common';

import { MvxFungibleToken } from '@/libs/blockchain/mvx/models';

/** Local Imports **/
import { VerifiedBy } from '../enums';
import { TokenEntity } from '../schemas/token.entity';
import { TokenRepository } from '../repositories/token.repository';

@Injectable()
export class TokensService {
  constructor(private readonly repository: TokenRepository) {}

  async findAll(): Promise<TokenEntity[]> {
    return this.repository.model.find();
  }

  async findOneByIdentifier(identifier: string): Promise<TokenEntity> {
    return this.repository.model.findOne({ identifier: identifier });
  }

  private setVerifiedByProps(token: MvxFungibleToken) {
    const tokenDocument = {
      ...token,
    } as Partial<TokenEntity>;

    if (this.isVerifiedByMultiversX(token)) {
      tokenDocument.verified = true;
      tokenDocument.verifiedBy = VerifiedBy.MultiversX;
    } else {
      tokenDocument.verified = false;
      tokenDocument.verifiedBy = VerifiedBy.NotVerified;
    }

    return tokenDocument;
  }

  saveTokens(tokens: MvxFungibleToken[]) {
    const updates = tokens.map((document) => {
      const decoratedToken = this.setVerifiedByProps(document);

      return {
        updateOne: {
          filter: { identifier: decoratedToken.identifier },
          update: decoratedToken,
          upsert: true,
        },
      };
    });

    return this.repository.model.bulkWrite(updates);
  }

  private isVerifiedByMultiversX(token: MvxFungibleToken) {
    // eslint-disable-next-line no-prototype-builtins
    return token.hasOwnProperty('assets') && token.assets !== undefined;
  }
}
