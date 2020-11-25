import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyfatRoutingModule } from './bodyfat-routing.module';
import { BodyfatComponent } from './bodyfat.component';
import { StoreModule } from '@ngrx/store';

import * as fromBodyfat from './store/bodyfat.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BodyfatEffects } from './store/bodyfat.effects';
import { EditBodyfatComponent } from './edit-bodyfat/edit-bodyfat.component';
import { SharedModule } from '@app-shared/shared.module';
import { BodyfatChartComponent } from './bodyfat-chart/bodyfat-chart.component';

@NgModule({
  declarations: [
    BodyfatComponent,
    EditBodyfatComponent,
    BodyfatChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BodyfatRoutingModule,
    StoreModule.forFeature(fromBodyfat.featureKey, fromBodyfat.bodyfatReducerFn),
    EffectsModule.forFeature([ BodyfatEffects ])
  ]
})
export class BodyfatModule { }
