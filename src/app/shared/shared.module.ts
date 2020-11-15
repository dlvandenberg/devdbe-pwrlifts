import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateValidatorDirective } from './validators/date-validator.directive';
import { DropdownDirective } from './dropdown.directive';
import { FormsModule } from '@angular/forms';
import { PasswordValidatorDirective } from './validators/password-validator.directive';
import { ErrorComponent } from './error/error.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    DateValidatorDirective,
    DropdownDirective,
    PasswordValidatorDirective,
    ErrorComponent,
    LoadingSpinnerComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DateValidatorDirective,
    PasswordValidatorDirective,
    DropdownDirective,
    FormsModule,
    ErrorComponent,
    LoadingSpinnerComponent,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
