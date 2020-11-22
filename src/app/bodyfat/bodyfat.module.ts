import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyfatRoutingModule } from './bodyfat-routing.module';
import { BodyfatComponent } from './bodyfat.component';


@NgModule({
  declarations: [
    BodyfatComponent],
  imports: [
    CommonModule,
    BodyfatRoutingModule
  ]
})
export class BodyfatModule { }
