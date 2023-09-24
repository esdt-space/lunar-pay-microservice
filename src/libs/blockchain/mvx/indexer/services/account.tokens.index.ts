import { Injectable } from '@nestjs/common';

import { IndexerService } from './indexer.service';
import {
  QueryHitItem,
  FungibleToken,
  SemiFungibleToken,
  QueryPitResponse,
  FungibleTokenRawSource,
} from '../models';

@Injectable()
export class AccountTokensIndex {
  private static ESDT_KEY = 'accountsesdt';

  constructor(private readonly indexerService: IndexerService) {}

  async getTokenHolders(
    tokenIdentifier: string,
  ): Promise<FungibleToken[] | SemiFungibleToken[]> {
    const pitObject = await this.indexerService.createPointInTime(
      AccountTokensIndex.ESDT_KEY,
    );

    let items = await this.getItems(pitObject.id, tokenIdentifier);

    let found = items.length;
    let lastValue = items[found - 1];

    while (found === this.indexerService.MAX_SIZE) {
      const nextItems = await this.getItems(
        pitObject.id,
        tokenIdentifier,
        lastValue.sort,
      );
      items = [...items, ...nextItems];

      found = nextItems.length;
      lastValue = nextItems[found - 1];
    }

    return items
      .filter(
        (item: QueryHitItem<FungibleTokenRawSource>) =>
          item._source.token === tokenIdentifier,
      )
      .map((item) => FungibleToken.fromQueryHit(item));
  }

  private getItems(
    pitId: string,
    tokenIdentifier: string,
    searchAfter?: number[],
  ): Promise<QueryHitItem<FungibleTokenRawSource>[]> {
    const options = this.getEsdtTokensQueryOptions(
      pitId,
      tokenIdentifier,
      searchAfter,
    );
    return this.indexerService
      .queryPointInTime(pitId, options)
      .then(
        (response: QueryPitResponse<FungibleTokenRawSource>) =>
          response.hits.hits,
      );
  }

  private getEsdtTokensQueryOptions(
    pitId: string,
    tokenIdentifier: string,
    searchAfter?: number[],
  ) {
    const options = {
      size: this.indexerService.MAX_SIZE,
      pit: {
        id: pitId,
        keep_alive: this.indexerService.PIT_KEEP_ALIVE,
      },
      sort: [{ timestamp: 'asc' }],
      query: {
        bool: {
          must: [
            {
              match: {
                token: tokenIdentifier,
              },
            },
          ],
          must_not: [
            {
              match: {
                balance: '0',
              },
            },
          ],
        },
      },
    };

    if (searchAfter) {
      options['search_after'] = searchAfter;
    }

    return options;
  }
}
