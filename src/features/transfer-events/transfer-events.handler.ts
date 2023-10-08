import { Injectable } from '@nestjs/common';
import { TransferEvent } from '@/events-notifier/events';
import { TransferEventsService } from '@/features/transfer-events/services/transfer.events.service';
import { CreateTransferEventsDto } from '@/features/transfer-events/dto';

@Injectable()
export class TransferEventsHandler {
  constructor(public readonly transferEventsService: TransferEventsService) {}

  public handleEvents(event: TransferEvent) {
    // TODO: Implement
  }

  private async handleTransferCreatedEvent(
    transferEvent: CreateTransferEventsDto,
  ) {
    // TODO: Implement
    await this.transferEventsService.create(transferEvent);
  }
}
