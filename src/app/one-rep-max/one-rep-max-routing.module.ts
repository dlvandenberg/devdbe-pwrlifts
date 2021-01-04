import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@app-auth/services/auth-guard.service';

import { OneRepMaxComponent } from './one-rep-max.component';

const routes: Routes = [
  {
    path: ':exercise',
    canActivate: [ AuthGuardService ],
    component: OneRepMaxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OneRepMaxRoutingModule { }
