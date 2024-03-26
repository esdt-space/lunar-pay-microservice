import { Prop } from '@nestjs/mongoose';

export class RedirectAndWebhooksSettings {
  @Prop({ type: String })
  donationRedirectUrl = '';

  @Prop({ type: String })
  httpWebhookUrl = '';

  @Prop({ type: String })
  httpWebhookSecret = '';
}
