import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeightRoutingModule } from './weight-routing.module';
import { WeightComponent } from './weight.component';


@NgModule({
  declarations: [WeightComponent],
  imports: [
    CommonModule,
    WeightRoutingModule
  ]
})
export class WeightModule { }
