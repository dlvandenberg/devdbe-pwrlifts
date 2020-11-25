import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@app-auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(public authService: AuthService) { }

  public onSubmit(form: NgForm): void {
    const values = form.value;
    this.authService.login(values.email, values.password);
  }
}
