import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './layout/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, RouterModule],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {}
