import { Component, OnInit } from '@angular/core';
import { DashboardType } from './model/dashboard-type.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public typeEnum = DashboardType;

  constructor() { }

  ngOnInit(): void {
  }

}
