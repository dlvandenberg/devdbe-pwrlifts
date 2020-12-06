import { Component, OnInit } from '@angular/core';
import { UserService } from '@app-user/services/user.service';
import { DashboardType } from './model/dashboard-type.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  public typeEnum = DashboardType;
}
