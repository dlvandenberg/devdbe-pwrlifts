import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: User;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => data.user))
      .subscribe(user => this.user = user);
  }

}
