export interface ICredentialsDto {
  apiKey?: string;
  user?: string;
  secretKey?: string;
  domain?: string;
  password?: string;
  host?: string;
  port?: string;
  secure?: boolean;
  region?: string;
  accountSid?: string;
  messageProfileId?: string;
  token?: string;
  from?: string;
  senderName?: string;
  projectName?: string;
  requireTls?: boolean;
  ignoreTls?: boolean;
  tlsOptions?: Record<string, unknown>;
  baseUrl?: string;
}
export interface IConstructIntegrationDto {
  credentials: ICredentialsDto;

  active: boolean;
}
