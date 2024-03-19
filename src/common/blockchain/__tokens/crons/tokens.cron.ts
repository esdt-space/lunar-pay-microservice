import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';

import { Locker } from '@/utils/locker';
import { MvxFungibleToken } from '@/libs/blockchain/mvx/models';
import { BlockchainTokensService } from '@/libs/blockchain/mvx/token';

import { TokensEvents } from '../enums';

@Injectable()
export class TokensCron {
  private readonly logger = new Logger(TokensCron.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly blockchainTokensService: BlockchainTokensService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  private fetchBlockchainEsdtTokensRunner() {
    Locker.lock('fetchBlockchainEsdtTokens', () =>
      this.fetchBlockchainEsdtTokens(),
    );
  }

  private async fetchBlockchainEsdtTokens() {
    const numberOfPages =
      await this.blockchainTokensService.getNumberOfEsdtTokensPages();

    const promises = [];
    for (let i = 0; i < numberOfPages; i++) {
      promises.push(this.blockchainTokensService.getEsdtTokens(i + 1));
    }

    const tokens: MvxFungibleToken[] = await Promise.all(promises).then(
      (results: MvxFungibleToken[]) => [].concat.apply([], results),
    );

    this.eventEmitter.emit(TokensEvents.FetchedTokens, tokens);

    return Promise.resolve();
  }
}
