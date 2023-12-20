import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EmailService } from "./email.service";
import { ContactDto } from "./dto";
import { ConfigService } from "@nestjs/config";

@ApiTags('Email Service')
@Controller('email-service')
export class EmailServiceController {
  constructor(
    private readonly emailService: EmailService,
    private readonly config: ConfigService,
  ){}

  @Post('contact')
  async triggerContactEmail(@Body() dto: ContactDto,){
    const input = {
      to: this.config.get('EMAIL_FROM'),
      from: this.config.get('EMAIL_FROM'),
      context: { 
        message: dto.message,
        name: dto.name,
        email: dto.email
      }
    }

    return await this.emailService.triggerMail(input)
  }
}