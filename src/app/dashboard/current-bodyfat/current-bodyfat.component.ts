import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app-dashboard/services/dashboard.service';

@Component({
  selector: 'app-current-bodyfat',
  templateUrl: './current-bodyfat.component.html',
  styleUrls: ['./current-bodyfat.component.scss']
})
export class CurrentBodyfatComponent implements OnInit {

  constructor(public readonly dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.fetchCurrentBodyfat();
  }

}
