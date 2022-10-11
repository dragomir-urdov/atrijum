import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthClientConfig } from '@auth0/auth0-angular';
import { firstValueFrom } from 'rxjs';

import { ClientConfig } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  static config: ClientConfig;

  // Prevent Auth0 interceptor
  private readonly http = new HttpClient(this.httpBackend);

  constructor(
    private readonly httpBackend: HttpBackend,
    private readonly authClientConfig: AuthClientConfig
  ) {}

  async init() {
    await this.getConfig();
    this.setupAuth();
  }

  private async getConfig() {
    ConfigService.config = await firstValueFrom(
      this.http.get<ClientConfig>('api/config')
    );
  }

  private setupAuth() {
    this.authClientConfig.set({
      cacheLocation: 'localstorage',
      clientId: ConfigService.config.authClientId,
      domain: ConfigService.config.authClientDomain,
      audience: ConfigService.config.authAudience,
      httpInterceptor: {
        allowedList: [
          {
            uriMatcher: (uri: string) => {
              if (uri.startsWith('api')) {
                return true;
              }
              return false;
            },
          },
        ],
      },
    });
  }
}
