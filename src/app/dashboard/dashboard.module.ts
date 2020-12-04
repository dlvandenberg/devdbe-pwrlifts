import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@app-shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './store/dashboard.reducer';
import { CurrentWeightComponent } from './current-weight/current-weight.component';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './store/dashboard.effects';
import { CurrentBodyfatComponent } from './current-bodyfat/current-bodyfat.component';

@NgModule({
  declarations: [DashboardComponent, CurrentWeightComponent, CurrentBodyfatComponent],
  imports: [
    CommonModule,
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
