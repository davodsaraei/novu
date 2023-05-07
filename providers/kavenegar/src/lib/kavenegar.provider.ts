import {
  ChannelTypeEnum,
  ISendMessageSuccessResponse,
  ISmsOptions,
  ISmsProvider,
  ICheckIntegrationResponse,
  CheckIntegrationResponseEnum,
} from '@novu/stateless';
import { KavenegarApi } from 'kavenegar';
import axios from 'axios';

export class KavenegarSmsProvider implements ISmsProvider {
  id = 'kavenegar';
  channelType = ChannelTypeEnum.SMS as ChannelTypeEnum.SMS;

  private kavenegarClient: KavenegarApi;

  constructor(
    private config: {
      apiKey?: string;
      from?: string;
    }
  ) {
    this.kavenegarClient = new KavenegarApi({
      apiKey: config.apiKey,
    });
  }

  async sendMessage(
    options: ISmsOptions
  ): Promise<ISendMessageSuccessResponse> {
    const kavenegarMessageId: string = await new Promise((resolve, reject) => {
      const callback = (response, status) => {
        if (status !== 200 || response.error) {
          return reject(response);
        } else {
          return resolve(response.messageid);
        }
      };

      const data = {
        message: options.content,
        receptor: options.to,
        sender: this.config.from,
      };

      return this.kavenegarClient.Send(data, callback);
    });

    return {
      id: kavenegarMessageId,
      date: new Date().toISOString(),
    };
  }

  async checkIntegration(
    options: ISmsOptions
  ): Promise<ICheckIntegrationResponse> {
    try {
      await this.sendMessage({
        to: options.to,
        from: this.config.from || options.from,
        content: options.content,
      });

      return {
        success: true,
        message: 'Integrated successfully!',
        code: CheckIntegrationResponseEnum.SUCCESS,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message,
        code: CheckIntegrationResponseEnum.FAILED,
      };
    }
  }
}
