import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { IpnSender } from '@/core/ipn/ipn-sender';

@Module({
  imports: [HttpModule],
  providers: [IpnSender],
  exports: [IpnSender],
})
export class IpnModule {}
