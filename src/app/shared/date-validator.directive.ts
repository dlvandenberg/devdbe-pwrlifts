import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[appDateValidator]',
  providers: [ { provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true } ]
})
export class DateValidatorDirective implements Validator {

  public validate(control: AbstractControl): ValidationErrors {
    const date: moment.Moment = moment(control.value, 'YYYY-mm-dd');
    return date.isValid ? null : { dateInvalid: true };
  }
}
