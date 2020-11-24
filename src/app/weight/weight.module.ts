import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeightRoutingModule } from './weight-routing.module';
import { WeightComponent } from './weight.component';
import { EditWeightComponent } from './edit-weight/edit-weight.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromWeight from './store/weight.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WeightEffects } from './store/weight.effects';
import { WeightChartComponent } from './weight-chart/weight-chart.component';

@NgModule({
  declarations: [WeightComponent, EditWeightComponent, WeightChartComponent],
  imports: [
    CommonModule,
    WeightRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromWeight.featureKey, fromWeight.weightReducerFn),
    EffectsModule.forFeature([ WeightEffects ])
  ]
})
export class WeightModule { }
