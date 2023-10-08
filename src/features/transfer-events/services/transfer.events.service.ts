import { Injectable, Logger } from '@nestjs/common';
import { TransferEventsRepository } from '../repositories/transfer.events.repository';
import { CreateTransferEventsDto } from '../dto';
import { TransferEvents } from '../schemas/transfer.events.schema';

@Injectable()
export class TransferEventsService {
  logger = new Logger();
  constructor(private readonly repository: TransferEventsRepository) {
    this.logger = new Logger(this.constructor.name);
  }

  async create(
    transferEvent: CreateTransferEventsDto,
  ): Promise<TransferEvents> {
    try {
      return await this.repository.model.create(transferEvent);
    } catch (e: any) {
      this.logger.error('create_transaction', { error: e.stack });
    }
    return null;
  }

  async findOneById(id: string): Promise<TransferEvents> {
    return this.repository.model.findOne({ _id: id });
  }
}
