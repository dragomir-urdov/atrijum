import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  APP_INITIALIZER,
  enableProdMode,
  ErrorHandler,
  importProvidersFrom,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { ConfigService } from './app/services/config.service';

import { environment } from './environments/environment';
import { AppErrorHandler } from './app/services/app-error.handler';

const initializeApp = (configService: ConfigService): Function => {
  return () => configService.init();
};

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      deps: [ConfigService],
      useFactory: initializeApp,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
    importProvidersFrom(
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      AuthModule.forRoot()
    ),
  ],
}).catch((err) => console.error(err));
