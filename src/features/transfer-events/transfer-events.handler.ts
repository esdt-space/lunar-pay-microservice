import { Injectable } from '@nestjs/common';
import { TransferEvent } from '@/events-notifier/events';
import { TransferEventsService } from '@/features/transfer-events/services/transfer.events.service';
import { CreateTransferEventsDto } from '@/features/transfer-events/dto';

@Injectable()
export class TransferEventsHandler {
  constructor(public readonly transferEventsService: TransferEventsService) {}

  public handleEvents(event: TransferEvent) {
    const transferToken = event.token.toJSON();

    const transferEventDto: CreateTransferEventsDto = {
      sender: event.address,
      receiver: event.receiver,
      tokenID: transferToken.tokenID,
      amount: transferToken.amount,
      nonce: transferToken.nonce,
      isInternal: event.isInternal,
    };

    return this.handleTransferCreatedEvent(transferEventDto);
  }

  private async handleTransferCreatedEvent(
    transferEvent: CreateTransferEventsDto,
  ) {
    await this.transferEventsService.create(transferEvent);
  }
}
