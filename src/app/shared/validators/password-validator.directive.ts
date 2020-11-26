import { Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [ { provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true } ]
})
export class PasswordValidatorDirective implements Validator {

  validate(control: FormGroup): ValidationErrors {
    if (!control) {
      return null;
    }
    const password = control.value.password;
    const repeatedPassword = control.value.repeatedPassword;

    return password !== repeatedPassword ? { unmatchingPasswords: true } : null;
  }
}
