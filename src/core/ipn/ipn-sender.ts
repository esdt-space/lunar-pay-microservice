import { Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IpnSender {
  constructor(private readonly httpService: HttpService) {}

  sendGetWebhook(url: string): Observable<AxiosResponse<unknown>> {
    return this.httpService.get(url);
  }

  sendPostWebhook(url: string, data: unknown): Promise<AxiosResponse<unknown>> {
    return axios.post(url, data);
  }

  sendPutWebhook(url: string, data?: unknown): Observable<AxiosResponse<unknown>> {
    return this.httpService.put(url, data);
  }

  sendDeleteWebhook(url: string, data: unknown): Observable<AxiosResponse<unknown>> {
    return this.httpService.post(url, data, { method: 'delete' });
  }
}