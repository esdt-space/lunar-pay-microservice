import { Module } from '@nestjs/common';
import { MvxAccountModule } from '@/libs/blockchain/mvx/account';

/** Local Imports **/
import { AccountTokensService } from './account-tokens.service';

@Module({
  imports: [MvxAccountModule],
  providers: [AccountTokensService],
  exports: [AccountTokensService],
})
export class AccountModule {}
