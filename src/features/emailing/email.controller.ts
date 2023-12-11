import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
// import { EmailService } from "./email.service";
import { NativeAuthGuard } from "@multiversx/sdk-nestjs-auth";
import { EmailDto } from "./dto/email.dto";
import { MailInterface } from "./dto/mail-interface";

@ApiTags('Email Service')
@Controller('email-service')
export class EmailServiceController {
  // constructor(
  //   private readonly emailService: EmailService,
  // ){}

  // @Post('trigger-email')
  // @UseGuards(NativeAuthGuard)
  // triggerEmail(@Body() dto: MailInterface,){
  //   return this.emailService.sendMail('id', dto)
  // }
}