import { Prop } from '@nestjs/mongoose';

export class RedirectAndWebhooksSettings {
  @Prop({ type: String })
  signSubscriptionRedirectUrl = '';

  @Prop({ type: String })
  httpWebhookUrl = '';

  @Prop({ type: String })
  httpWebhookSecret = '';
}