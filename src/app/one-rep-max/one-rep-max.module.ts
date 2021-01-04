import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OneRepMaxRoutingModule } from './one-rep-max-routing.module';
import { OneRepMaxComponent } from './one-rep-max.component';
import { EditOneRepMaxComponent } from './edit-one-rep-max/edit-one-rep-max.component';
import { SharedModule } from '@app-shared/shared.module';
import { StoreModule } from '@ngrx/store';

import * as fromOneRepMax from './store/one-rep-max.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OneRepMaxEffects } from './store/one-rep-max.effects';
import { OneRepMaxChartComponent } from './one-rep-max-chart/one-rep-max-chart.component';

@NgModule({
  declarations: [
    OneRepMaxComponent,
    EditOneRepMaxComponent,
    OneRepMaxChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OneRepMaxRoutingModule,
    StoreModule.forFeature(fromOneRepMax.featureKey, fromOneRepMax.oneRepMaxReducerFn),
    EffectsModule.forFeature([ OneRepMaxEffects ])
  ]
})
export class OneRepMaxModule { }
