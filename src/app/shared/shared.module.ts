import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateValidatorDirective } from './date-validator.directive';
import { DropdownDirective } from './dropdown.directive';
import { FormsModule } from '@angular/forms';
import { PasswordValidatorDirective } from './password-validator.directive';

@NgModule({
  declarations: [
    DateValidatorDirective,
    DropdownDirective,
    PasswordValidatorDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DateValidatorDirective,
    PasswordValidatorDirective,
    DropdownDirective,
    FormsModule
  ]
})
export class SharedModule { }
