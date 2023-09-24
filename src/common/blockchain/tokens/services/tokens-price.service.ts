import { Injectable } from '@nestjs/common';

/** Local Imports **/
import { TokenPriceEntity } from '../schemas/token.price.entity';
import { TokenPricesRepository } from '../repositories/token.prices.repository';

@Injectable()
export class TokensPriceService {
  constructor(private readonly repository: TokenPricesRepository) {}

  async findAll(): Promise<TokenPriceEntity[]> {
    return this.repository.model.find();
  }
}
