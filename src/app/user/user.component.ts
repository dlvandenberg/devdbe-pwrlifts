import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from './model/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: User;

  constructor(public readonly userService: UserService) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => this.user = user);
  }

  public updateUser(form: NgForm): void {
    const values = form.value;
    this.userService.updateUser({
      id: this.user.id,
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth,
      email: this.user.email
    });
  }
}
