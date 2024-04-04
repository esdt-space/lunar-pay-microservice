import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { ThrottlerGuard } from '@nestjs/throttler'

import { EmailService } from "./email.service";
import { ContactDto } from "./dto";

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(
    private readonly emailService: EmailService,
    private readonly config: ConfigService,
  ){}

  @Post('contact')
  @UseGuards(ThrottlerGuard)
  async contact(@Body() dto: ContactDto,){
    const input = {
      to: this.config.get('EMAIL_FROM'),
      from: this.config.get('EMAIL_FROM'),
      context: { 
        message: dto.message,
        name: dto.name,
        email: dto.email
      }
    }

    return await this.emailService.sendMail(input)
  }
}