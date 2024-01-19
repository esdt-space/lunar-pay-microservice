import axios from "axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InstantPaymentNotificationService {
  async sendNotification<T>(url: string, userInfo: T){
    return axios.post(url, userInfo)
  }
}
