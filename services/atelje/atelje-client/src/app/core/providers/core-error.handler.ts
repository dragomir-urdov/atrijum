import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoreErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: unknown): Observable<unknown> {
    this.logError(error);

    return throwError(() => error);
  }

  private logError(error: any) {
    if (environment.production) {
      return;
    }

    let errorMessage = '';
    if (error.message) {
      errorMessage = error.message;
    } else if (error.status && error.statusText) {
      errorMessage = `${error.status} - ${error.statusText}`;
    } else {
      errorMessage = 'Server error';
    }

    console.warn(errorMessage, error);
  }
}
