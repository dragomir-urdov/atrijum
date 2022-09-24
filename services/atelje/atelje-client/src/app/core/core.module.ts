import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ErrorHandler,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CoreRoutingModule } from './core-routing.module';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { CoreErrorHandler } from './providers/core-error.handler';
import { CoreHttpInterceptor } from './providers/core-http.interceptor';
import { ConfigService } from './services/config.service';

const components = [MainComponent, HeaderComponent, FooterComponent];

function initializeApp(configService: ConfigService): Function {
  return () => configService.init();
}

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    CoreRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  exports: [components],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [ConfigService],
      useFactory: initializeApp,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoreHttpInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: CoreErrorHandler,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
