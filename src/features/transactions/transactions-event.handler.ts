import { Injectable } from '@nestjs/common';
import { TransactionService } from '@/features/transactions/services/transaction.service';
import { DepositEvent, WithdrawEvent } from '@/events-notifier/events';
import { TransactionType } from '@/features/transactions/enums/transaction-type.enum';
import { CreateTransactionDto } from '@/features/transactions/dto';

@Injectable()
export class TransactionsEventHandler {
  constructor(public readonly transactionService: TransactionService) {}

  public handleEvents(event: DepositEvent | WithdrawEvent) {
    // TODO: Implement

    const transactionType =
      event.getIdentifier() === TransactionType.DEPOSIT
        ? TransactionType.DEPOSIT
        : TransactionType.WITHDRAW;
  }

  private async handleTransactionCreatedEvent(
    createTransaction: CreateTransactionDto,
  ) {
    // TODO: Implement
    await this.transactionService.create(createTransaction);
  }
}
