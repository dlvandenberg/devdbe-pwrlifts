import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '@app-auth/services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  const authServiceMock: Partial<AuthService> = {
    login(): void {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ { provide: AuthService, useValue: authServiceMock }]
    });

    const authService = TestBed.inject(AuthService);
    component = new LoginComponent(authService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login() when onSubmit method is called', () => {
    const spy = spyOn(authServiceMock, 'login');

    const ngForm = new NgForm([], []);
    ngForm.form = new FormGroup({ email: new FormControl('value'), password: new FormControl('test') });

    component.onSubmit(ngForm);

    expect(spy).toHaveBeenCalledWith('value', 'test');
  });
});
