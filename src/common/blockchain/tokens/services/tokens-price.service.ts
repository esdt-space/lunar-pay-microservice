import { Injectable } from '@nestjs/common';

/** Local Imports **/
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenPrice } from '../entities';

@Injectable()
export class TokensPriceService {
  constructor(
    @InjectRepository(TokenPrice)  private repository: Repository<TokenPrice>
  ) {}

  async findAll(): Promise<TokenPrice[]> {
    return this.repository.find();
  }
}
