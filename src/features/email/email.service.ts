import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailDto } from './dto';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(options: EmailDto) {
    return await this.mailerService.sendMail(options);
  }
}