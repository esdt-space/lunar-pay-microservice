import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  DepositEvent,
  TransferEvent,
  WithdrawEvent,
} from '@/events-notifier/events';

import { TokenOperationType } from './enums';
import { CreateTokenOperationDto } from './dto';
import { TokenOperationService } from './token-operation.service';

type TokenOperationEvent = DepositEvent | TransferEvent | WithdrawEvent;

@Injectable()
export class TokenOperationEventHandler {
  constructor(
    private readonly config: ConfigService,
    public readonly tokenOperationService: TokenOperationService,
  ) {}

  public handleEvents(event: TokenOperationEvent) {
    let dto: CreateTokenOperationDto;

    switch (true) {
      case event.name === TokenOperationType.DEPOSIT:
        dto = this.handleDepositEvent(event as DepositEvent);
        break;
      case event.name === TokenOperationType.WITHDRAW:
        dto = this.handleWithdrawEvent(event as WithdrawEvent);
        break;
      case event.name === TokenOperationType.TRANSFER:
        dto = this.handleTransferEvent(event as TransferEvent);
        break;
      default:
        throw new Error('Cannot handle event');
    }

    return this.tokenOperationService.create(dto);
  }

  private handleDepositEvent(event: DepositEvent) {
    return {
      ...this.getCommonDtoProperties(event),
      sender: event.address,
      receiver: this.config.get('contracts').lunarPayVault as string,
      type: TokenOperationType.DEPOSIT,
    } as CreateTokenOperationDto;
  }

  private handleWithdrawEvent(event: WithdrawEvent) {
    return {
      ...this.getCommonDtoProperties(event),
      sender: this.config.get('contracts').lunarPayVault as string,
      receiver: event.address,
      type: TokenOperationType.WITHDRAW,
    } as CreateTokenOperationDto;
  }

  private handleTransferEvent(event: TransferEvent) {
    return {
      ...this.getCommonDtoProperties(event),
      sender: event.sender,
      receiver: event.receiver,
      isInternal: event.isInternal,
      type: TokenOperationType.TRANSFER,
    } as CreateTokenOperationDto;
  }

  private getCommonDtoProperties(event: TokenOperationEvent) {
    const transactionToken = event.token.toJSON();

    return {
      amount: transactionToken.amount,
      tokenNonce: transactionToken.nonce,
      tokenIdentifier: transactionToken.tokenIdentifier,
      txHash: event.txHash,
    } as CreateTokenOperationDto;
  }
}
