import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app-dashboard/services/dashboard.service';

@Component({
  selector: 'app-wilks',
  templateUrl: './wilks.component.html'
})
export class WilksComponent implements OnInit {

  constructor(public readonly dashboardService: DashboardService) { }

  public ngOnInit(): void {
    this.dashboardService.calculateWilks();
  }
}
