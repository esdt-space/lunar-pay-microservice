import { Column } from 'typeorm';

export class RedirectAndWebhooksSettings {
  @Column({ type: String })
  signAgreementRedirectUrl = '';

  @Column({ type: String })
  httpWebhookUrl = '';

  @Column({ type: String })
  httpWebhookSecret = '';
}
