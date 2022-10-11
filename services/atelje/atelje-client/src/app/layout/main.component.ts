import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { FooterComponent } from './footer.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  providers: [],
  template: `
    <div *ngIf="(isLoading$ | async) === false; else loading">
      <app-header></app-header>
      <main>
        <button *ngIf="(user$ | async) === null || undefined" (click)="login()">
          Login
        </button>
        <button *ngIf="user$ | async" (click)="logout()">Logout</button>
        <router-outlet></router-outlet>
        {{ user$ | async | json }}
        <button (click)="testApi()">TEST</button>
      </main>
      <app-footer></app-footer>
    </div>
    <ng-template #loading>
      <div>SPINNER</div>
    </ng-template>
  `,
})
export class MainComponent {
  protected user$ = this.authService.user$;
  protected isLoading$ = this.authService.isLoading$;

  constructor(
    private readonly authService: AuthService,
    private readonly http: HttpClient
  ) {}

  protected login() {
    this.authService.loginWithPopup();
  }

  protected logout() {
    this.authService.logout();
  }

  testApi() {
    this.http.get('api/user').subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
