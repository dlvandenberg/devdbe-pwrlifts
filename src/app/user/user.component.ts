import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { DestroyObservable } from '../shared/destroy.observable';
import { User } from './model/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [ DestroyObservable ]
})
export class UserComponent implements OnInit {

  public user: User;

  constructor(
    private readonly destroy$: DestroyObservable,
    public readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.user$.pipe(takeUntil(this.destroy$)).subscribe(user => this.user = user);
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
