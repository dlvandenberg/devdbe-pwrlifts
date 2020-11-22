import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyfatRoutingModule } from './bodyfat-routing.module';
import { BodyfatComponent } from './bodyfat.component';
import { StoreModule } from '@ngrx/store';

import * as fromBodyfat from './store/bodyfat.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BodyfatEffects } from './store/bodyfat.effects';
import { EditBodyfatComponent } from './edit-bodyfat/edit-bodyfat.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BodyfatComponent,
    EditBodyfatComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    BodyfatRoutingModule,
    StoreModule.forFeature(fromBodyfat.featureKey, fromBodyfat.bodyfatReducerFn),
    EffectsModule.forFeature([ BodyfatEffects ])
  ]
})
export class BodyfatModule { }
