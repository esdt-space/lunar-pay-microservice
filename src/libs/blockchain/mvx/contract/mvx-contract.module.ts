import { Global, Module } from '@nestjs/common';
import { ContractQueryHandler } from './contract-query.handler';

@Global()
@Module({
  providers: [ContractQueryHandler],
  exports: [ContractQueryHandler],
})
export class MvxContractModule {}
