import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '@app-auth/services/auth.service';
import { Gender } from '@app-types/gender.enum';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  const authServiceMock: Partial<AuthService> = {
    signUp(): void {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ { provide: AuthService, useValue: authServiceMock }]
    });

    const authService = TestBed.inject(AuthService);
    component = new SignUpComponent(authService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.signUp() when onSubmit method is called', () => {
    const spy = spyOn(authServiceMock, 'signUp');

    const ngForm = new NgForm([], []);
    ngForm.form = new FormGroup({
      firstName: new FormControl('Dennis'),
      lastName: new FormControl('van den Berg'),
      gender: new FormControl(Gender.MALE),
      dateOfBirth: new FormControl(new Date('1989-10-14')),
      email: new FormControl('value'),
      password: new FormControl('test')
    });

    component.onSubmit(ngForm);

    expect(spy).toHaveBeenCalledWith({
      firstName: 'Dennis',
      lastName: 'van den Berg',
      gender: Gender.MALE,
      dateOfBirth: new Date('1989-10-14'),
      email: 'value',
      password: 'test'
    });
  });
});

