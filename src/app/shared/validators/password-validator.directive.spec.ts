import { FormControl, FormGroup } from '@angular/forms';
import { PasswordValidatorDirective } from './password-validator.directive';

describe('PasswordValidatorDirective', () => {
  let directive: PasswordValidatorDirective;

  beforeEach(() => {
    directive = new PasswordValidatorDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should return null when passwords match', () => {
    const formGroup = new FormGroup({
      password: new FormControl('testpassword'),
      repeatedPassword: new FormControl('testpassword')
    });

    const result = directive.validate(formGroup);

    expect(result).toBeFalsy();
  });

  it('should return an error when passwords do not match', () => {
    const formGroup = new FormGroup({
      password: new FormControl('testpassword'),
      repeatedPassword: new FormControl('otherpassword')
    });

    const result = directive.validate(formGroup);

    expect(result).toEqual({ unmatchingPasswords: true });
  });
});
