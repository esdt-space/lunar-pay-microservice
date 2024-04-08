import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

import { BlockchainEventDecoded } from '@/events-notifier/enums';

import { TokenOperationType } from './enums';
import { CreateTokenOperationDto } from './dto';
import { TokenOperationService } from './token-operation.service';
import { TriggerEvent } from '@/libs/blockchain/mvx/event-decoder';
import { 
  DepositWithdrawEventTopics, 
  TransferEventTopics, 
  DepositWithdrawParsedEventResult, 
  TransferParsedEventResult 
} from '@/events-notifier/events/token-management';

@Injectable()
export class TokenOperationEventHandler {
  constructor(
    private readonly config: ConfigService,
    public readonly tokenOperationService: TokenOperationService,
  ) {}

  @OnEvent(BlockchainEventDecoded.BlockchainDepositEventDecoded)
  async handleDepositEvent(event: TriggerEvent<DepositWithdrawEventTopics>) {
    const dto =  {
      ...this.getCommonDtoProperties(event),
      sender: event.address,
      receiver: this.config.get('contracts').lunarPayVault as string,
      type: TokenOperationType.DEPOSIT,
      createdAt: new Date(Date.now()),
    } as CreateTokenOperationDto;

    return this.tokenOperationService.create(dto);
  }

  @OnEvent(BlockchainEventDecoded.BlockchainWithdrawEventDecoded)
  async handleWithdrawEvent(event: TriggerEvent<DepositWithdrawEventTopics>) {
    const dto = {
      ...this.getCommonDtoProperties(event),
      sender: this.config.get('contracts').lunarPayVault as string,
      receiver: event.address,
      type: TokenOperationType.WITHDRAW,
      createdAt: new Date(Date.now()),
    } as CreateTokenOperationDto;

    return this.tokenOperationService.create(dto);
  }

  @OnEvent(BlockchainEventDecoded.BlockchainTokenTransferEventDecoded)
  async handleTransferEvent(event: TriggerEvent<TransferEventTopics>) {
    const transactionToken = event.getTopics() as TransferParsedEventResult;

    const dto = {
      amount: transactionToken.token.amount.toString(),
      tokenNonce: Number(transactionToken.token.nonce),
      tokenIdentifier: transactionToken.token.tokenIdentifier,
      txHash: event.txHash,
      sender: transactionToken.sender,
      receiver: transactionToken.receiver,
      isInternal: transactionToken.isInternal,
      type: TokenOperationType.TRANSFER,
      createdAt: new Date(Date.now()),
    } as CreateTokenOperationDto;

    return this.tokenOperationService.create(dto);
  }

  private getCommonDtoProperties(event: TriggerEvent<DepositWithdrawEventTopics>) {
    const transactionToken = event.getTopics() as DepositWithdrawParsedEventResult;

    return {
      amount: transactionToken.token.amount.toString(),
      tokenNonce: Number(transactionToken.token.nonce),
      tokenIdentifier: transactionToken.token.tokenIdentifier,
      txHash: event.txHash,
    };
  }
}
