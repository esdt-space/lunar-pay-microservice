import { Module } from '@nestjs/common';

import { MvxAccountService } from './account.service';

@Module({
  exports: [MvxAccountService],
  providers: [MvxAccountService],
})
export class MvxAccountModule {}
