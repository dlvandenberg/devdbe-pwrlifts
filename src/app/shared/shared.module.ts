import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateValidatorDirective } from './validators/date-validator.directive';
import { DropdownDirective } from './dropdown.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordValidatorDirective } from './validators/password-validator.directive';
import { ErrorComponent } from './error/error.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { LineBarChartComponent } from './charts/line-bar-chart/line-bar-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';

@NgModule({
  declarations: [
    DateValidatorDirective,
    DropdownDirective,
    PasswordValidatorDirective,
    ErrorComponent,
    LoadingSpinnerComponent,
    ConfirmationDialogComponent,
    LineBarChartComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  exports: [
    DateValidatorDirective,
    PasswordValidatorDirective,
    DropdownDirective,
    FormsModule,
    ReactiveFormsModule,
    ErrorComponent,
    LoadingSpinnerComponent,
    ConfirmationDialogComponent,
    LineBarChartComponent,
    LineChartComponent
  ]
})
export class SharedModule { }
