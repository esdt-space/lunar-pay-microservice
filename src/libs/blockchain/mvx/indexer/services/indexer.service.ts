import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { CreatePitResponse, QueryPitResponse } from '../models';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IndexerService {
  public MAX_SIZE = 10000;
  public PIT_KEEP_ALIVE = '5m';
  private readonly INDEX_URL: string;

  constructor(
    private httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.INDEX_URL = config.get('urls').elasticHost;
  }

  queryPointInTime(
    pointInTimeId: string,
    options: unknown,
  ): Promise<QueryPitResponse<unknown>> {
    const url = `${this.INDEX_URL}/_search`;
    return lastValueFrom(this.httpService.get(url, { data: options })).then(
      (response) => response.data,
    );
  }

  createPointInTime(index: string): Promise<CreatePitResponse> {
    const url = `${this.INDEX_URL}/${index}/_pit?keep_alive=${this.PIT_KEEP_ALIVE}`;

    return lastValueFrom(this.httpService.post(url)).then(
      (response) => response.data,
    );
  }
}
