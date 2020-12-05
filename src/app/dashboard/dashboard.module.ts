import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@app-shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './store/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './store/dashboard.effects';
import { RouterModule } from '@angular/router';
import { CurrentComponent } from './current/current.component';

@NgModule({
  declarations: [DashboardComponent, CurrentComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(
      fromDashboard.featureKey,
      fromDashboard.dashboardReducerFn
    ),
    EffectsModule.forFeature([ DashboardEffects ]),
    DashboardRoutingModule,
    SharedModule,
  ],
})
export class DashboardModule {}
