import { Injectable } from '@nestjs/common';

import { UacService } from './uac.service';

@Injectable()
export class UacEventsHandler {
  constructor(public readonly uacService: UacService) {}

  public handleEvents() {
    // TODO: Implement
  }

  private async handleUacCreatedEvent(event: any) {
    // TODO: Implement
    await this.uacService.createUAC(event);
  }
}
