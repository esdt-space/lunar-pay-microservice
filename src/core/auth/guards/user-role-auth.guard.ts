import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { UserRole } from '@/core/auth/enums';
// import { Roles } from '@/core/auth/decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private config: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // const roles = this.reflector.get(Roles, context.getHandler());

    // if (!roles) {
    //   return true;
    // }

    const request = context.switchToHttp().getRequest();
    const userAddress = request.nativeAuth.address;

    console.log(userAddress);

    return true;

    // return roles.map(role => role === this.getHighestRole(userAddress)).includes(true);
  }

  getHighestRole(address: string) {
    switch (true) {
      case this.isAdmin(address):
        return UserRole.Admin;
      case this.isSupportAddress(address):
        return UserRole.Support;
      case this.isCommunityAdminAddress(address):
        return UserRole.CommunityAdmin;
      default:
        return UserRole.None;
    }
  }

  isAdmin(address: string) {
    return (this.config.get('adminWallets') || []).includes(address);
  }

  isSupportAddress(address: string) {
    return false;
  }

  isCommunityAdminAddress(address: string) {
    return false;
  }
}