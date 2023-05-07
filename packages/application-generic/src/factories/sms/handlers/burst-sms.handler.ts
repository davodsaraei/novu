import { ChannelTypeEnum } from '@novu/shared';
import { ICredentials } from '@novu/dal';
import { BaseSmsHandler } from './base.handler';
import { BurstSmsProvider } from '@novu/burst-sms';

export class BurstSmsHandler extends BaseSmsHandler {
  constructor() {
    super('burst-sms', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new BurstSmsProvider({
      apiKey: credentials.apiKey,
      secretKey: credentials.secretKey,
    });
  }
}
