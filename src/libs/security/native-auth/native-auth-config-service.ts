import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErdnestConfigService } from '@multiversx/sdk-nestjs-common';

@Injectable()
export class NativeAuthConfigService implements ErdnestConfigService {
  constructor(private readonly config: ConfigService) {}

  getSecurityAdmins(): string[] {
    return [];
  }

  getJwtSecret(): string {
    return ''; // We use only NativeAuth in this template, so we don't need a JWT secret
  }

  getApiUrl(): string {
    return this.config.get('urls').blockchainApi;
  }

  getNativeAuthMaxExpirySeconds(): number {
    return this.config.get('nativeAuth').maxExpirySeconds;
  }

  getNativeAuthAcceptedOrigins(): string[] {
    return this.config.get('nativeAuth').acceptedOrigins;
  }
}
