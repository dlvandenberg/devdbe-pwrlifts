import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@app-auth/services/auth-guard.service';

import { WeightComponent } from './weight.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ AuthGuardService ],
    component: WeightComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeightRoutingModule { }
