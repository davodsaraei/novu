import { ChannelTypeEnum } from '@novu/shared';
import { ICredentials } from '@novu/dal';
import { KavenegarSmsProvider } from '@novu/kavenegar';
import { BaseSmsHandler } from './base.handler';

export class KavenegarHandler extends BaseSmsHandler {
  constructor() {
    super('kavenegar', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    if (!credentials.apiKey || !credentials.from) {
      throw Error('Config is not valid for kavenegar-sms provider');
    }

    this.provider = new KavenegarSmsProvider({
      apiKey: credentials.apiKey,
      from: credentials.from,
    });
  }
}
