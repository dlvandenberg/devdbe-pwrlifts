import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public authService: AuthService) { }

  public onSubmit(form: NgForm): void {
    const values = form.value;
    this.authService.login(values.email, values.password);
  }
}
