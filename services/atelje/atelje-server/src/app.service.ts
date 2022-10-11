import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from './config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getClientConfig() {
    return {
      authClientDomain: this.configService.get(Config.AUTH0_CLIENT_DOMAIN),
      authClientId: this.configService.get(Config.AUTH0_CLIENT_ID),
      authAudience: this.configService.get(Config.AUTH0_AUDIENCE),
    };
  }
}
