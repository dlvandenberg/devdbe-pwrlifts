import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyMeasurementRoutingModule } from './body-measurement-routing.module';
import { BodyMeasurementComponent } from './body-measurement.component';
import { StoreModule } from '@ngrx/store';

import * as fromBodyMeasurement from './store/body-measurements.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BodyMeasurementEffects } from './store/body-measurements.effects';
import { EditBodyMeasurementComponent } from './edit-body-measurement/edit-body-measurement.component';
import { SharedModule } from '@app-shared/shared.module';
import { BodyMeasurementChartComponent } from './body-measurement-chart/body-measurement-chart.component';

@NgModule({
  declarations: [
    BodyMeasurementComponent,
    EditBodyMeasurementComponent,
    BodyMeasurementChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BodyMeasurementRoutingModule,
    StoreModule.forFeature(fromBodyMeasurement.featureKey, fromBodyMeasurement.bodyMeasurementReducerFn),
    EffectsModule.forFeature([ BodyMeasurementEffects ])
  ]
})
export class BodyMeasurementModule { }
