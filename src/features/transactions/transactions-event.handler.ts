import { Injectable } from '@nestjs/common';
import { TransactionService } from '@/features/transactions/services/transaction.service';
import { DepositEvent, WithdrawEvent } from '@/events-notifier/events';
import { TransactionType } from '@/features/transactions/enums/transaction-type.enum';
import { CreateTransactionDto } from '@/features/transactions/dto';

@Injectable()
export class TransactionsEventHandler {
  constructor(public readonly transactionService: TransactionService) {}

  public handleEvents(event: DepositEvent | WithdrawEvent) {
    const transactionType =
      event.getIdentifier() === TransactionType.DEPOSIT
        ? TransactionType.DEPOSIT
        : TransactionType.WITHDRAW;
    const transactionToken = event.token.toJSON();

    const transactionDto: CreateTransactionDto = {
      address: event.address,
      tokenID: transactionToken.tokenID,
      amount: transactionToken.amount,
      nonce: transactionToken.nonce,
      type: transactionType,
    };

    return this.handleTransactionCreatedEvent(transactionDto);
  }

  private async handleTransactionCreatedEvent(
    createTransaction: CreateTransactionDto,
  ) {
    await this.transactionService.create(createTransaction);
  }
}
