import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(public authService: AuthService) { }

  public onSubmit(form: NgForm): void {
    const values = form.value;

    this.authService.signUp({
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth,
      email: values.email,
      password: values.password
    });
  }
}
