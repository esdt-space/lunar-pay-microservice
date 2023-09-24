import { Global, Module } from '@nestjs/common';
import { ERDNEST_CONFIG_SERVICE } from '@multiversx/sdk-nestjs-common';
import { NativeAuthConfigService } from './native-auth-config-service';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: ERDNEST_CONFIG_SERVICE,
      useClass: NativeAuthConfigService,
    },
  ],
  exports: [ERDNEST_CONFIG_SERVICE],
})
export class NativeAuthModule {}
