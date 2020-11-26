import { FormControl } from '@angular/forms';
import { DateValidatorDirective } from './date-validator.directive';

describe('DateValidatorDirective', () => {
  let directive: DateValidatorDirective;

  beforeEach(() => {
    directive = new DateValidatorDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should return null when date is valid', () => {
    const date = new FormControl(new Date('2020-10-10'));
    const result = directive.validate(date);
    expect(result).toBeFalsy();
  });

  it('should return an error when date is invalid', () => {
    const date = new FormControl(new Date('2020-20-20'));
    const result = directive.validate(date);
    expect(result).toEqual({ dateInvalid: true });
  });
});
