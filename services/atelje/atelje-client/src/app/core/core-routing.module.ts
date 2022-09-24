import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const CORE_ROUTES: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(CORE_ROUTES)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
