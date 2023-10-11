import { Injectable } from '@nestjs/common';
import { TransactionService } from '@/features/transactions/services/transaction.service';
import {
  DepositEvent,
  TransferEvent,
  WithdrawEvent,
} from '@/events-notifier/events';
import { TransactionType } from '@/features/transactions/enums/transaction-type.enum';
import { CreateTransactionDto } from '@/features/transactions/dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionsEventHandler {
  constructor(
    public readonly transactionService: TransactionService,
    private readonly config: ConfigService,
  ) {}

  public handleEvents(event: DepositEvent | WithdrawEvent | TransferEvent) {
    let sender, receiver, transactionType;
    if (event instanceof DepositEvent) {
      sender = event.address;
      receiver = this.config.get('contracts').lunarPayVault;
      transactionType = TransactionType.DEPOSIT;
    }

    if (event instanceof WithdrawEvent) {
      sender = this.config.get('contracts').lunarPayVault;
      receiver = event.address;
      transactionType = TransactionType.WITHDRAW;
    }
    const transactionToken = event.token.toJSON();

    const transactionDto: CreateTransactionDto = {
      sender: sender,
      receiver: receiver,
      tokenID: transactionToken.tokenID,
      amount: transactionToken.amount,
      nonce: transactionToken.nonce,
      txHash: event.txHash,
      type: transactionType,
    };

    if (event instanceof TransferEvent) {
      transactionDto.isInternal = event.isInternal;
      transactionDto.type = TransactionType.TRANSFER;
    }

    return this.handleTransactionCreatedEvent(transactionDto);
  }

  private async handleTransactionCreatedEvent(
    createTransaction: CreateTransactionDto,
  ) {
    await this.transactionService.create(createTransaction);
  }
}
