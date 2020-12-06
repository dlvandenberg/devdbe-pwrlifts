import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@app-auth/services/auth-guard.service';

import { BodyMeasurementComponent } from './body-measurement.component';

const routes: Routes = [
  { path: ':type',
  canActivate: [ AuthGuardService ],
  component: BodyMeasurementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyMeasurementRoutingModule { }
