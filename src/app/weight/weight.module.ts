import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeightRoutingModule } from './weight-routing.module';
import { WeightComponent } from './weight.component';
import { EditWeightComponent } from './edit-weight/edit-weight.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromWeight from './store/weight.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WeightEffects } from './store/weight.effects';

@NgModule({
  declarations: [WeightComponent, EditWeightComponent],
  imports: [
    CommonModule,
    WeightRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromWeight.featureKey, fromWeight.weightReducerFn),
    EffectsModule.forFeature([ WeightEffects ])
  ]
})
export class WeightModule { }
