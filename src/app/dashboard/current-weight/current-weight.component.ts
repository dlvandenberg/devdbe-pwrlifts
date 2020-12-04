import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app-dashboard/services/dashboard.service';

@Component({
  selector: 'app-current-weight',
  templateUrl: './current-weight.component.html',
  styleUrls: ['./current-weight.component.scss']
})
export class CurrentWeightComponent implements OnInit {

  constructor(public readonly dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.fetchCurrentWeight();
  }

}
