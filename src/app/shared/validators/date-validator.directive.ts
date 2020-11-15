import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const date: moment.Moment = moment(control.value, 'YYYY-MM-DD');
    return date.isValid ? null : { dateInvalid: true };
  };
}

@Directive({
  selector: '[appDateValidator]',
  providers: [ { provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true } ]
})
export class DateValidatorDirective implements Validator {

  public validate(control: AbstractControl): ValidationErrors {
    return dateValidator()(control);
  }
}
