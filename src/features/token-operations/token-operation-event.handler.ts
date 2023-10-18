import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

import { BlockchainEventDecoded } from '@/events-notifier/enums';
import { DepositEvent, TransferEvent, WithdrawEvent } from '@/events-notifier/events';

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

  @OnEvent(BlockchainEventDecoded.BlockchainDepositEventDecoded)
  async handleDepositEvent(event: DepositEvent) {
    const dto =  {
      ...this.getCommonDtoProperties(event),
      sender: event.address,
      receiver: this.config.get('contracts').lunarPayVault as string,
      type: TokenOperationType.DEPOSIT,
    } as CreateTokenOperationDto;

    return this.tokenOperationService.create(dto);
  }

  @OnEvent(BlockchainEventDecoded.BlockchainWithdrawEventDecoded)
  async handleWithdrawEvent(event: WithdrawEvent) {
    const dto = {
      ...this.getCommonDtoProperties(event),
      sender: this.config.get('contracts').lunarPayVault as string,
      receiver: event.address,
      type: TokenOperationType.WITHDRAW,
    } as CreateTokenOperationDto;

    return this.tokenOperationService.create(dto);

  }

  @OnEvent(BlockchainEventDecoded.BlockchainTokenTransferEventDecoded)
  async handleTransferEvent(event: TransferEvent) {
    const dto = {
      ...this.getCommonDtoProperties(event),
      sender: event.sender,
      receiver: event.receiver,
      isInternal: event.isInternal,
      type: TokenOperationType.TRANSFER,
    } as CreateTokenOperationDto;

    return this.tokenOperationService.create(dto);
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
