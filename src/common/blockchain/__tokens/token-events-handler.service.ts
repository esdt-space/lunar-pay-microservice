// import { Injectable } from '@nestjs/common';
// import { OnEvent } from '@nestjs/event-emitter';

// import { MvxFungibleToken } from '@/libs/blockchain/mvx/models';

// import { TokensEvents } from './enums';
// import { TokensService } from './tokens.service';

// @Injectable()
// export class TokenEventsHandlerService {
//   constructor(private readonly tokensService: TokensService) {}

//   @OnEvent(TokensEvents.FetchedTokens)
//   async handleTokensFetchedEvent(tokens: MvxFungibleToken[]) {
//     await this.tokensService.saveTokens(tokens);
//   }
// }
