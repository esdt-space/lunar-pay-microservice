import { Module } from '@nestjs/common';
import { MvxContractModule } from '@/libs/blockchain/mvx/contract/mvx-contract.module';

/** Local Imports **/
import { VaultService } from './vault.service';

@Module({
  imports: [MvxContractModule],
  providers: [VaultService],
  exports: [VaultService],
})
export class VaultModule {}
