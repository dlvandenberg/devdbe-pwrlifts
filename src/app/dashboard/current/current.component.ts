import { Component, Input, OnInit } from '@angular/core';
import { DashboardType } from '@app-dashboard/model/dashboard-type.enum';
import { DashboardService } from '@app-dashboard/services/dashboard.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
  @Input()
  public type: DashboardType;

  constructor(public readonly dashboardService: DashboardService) { }

  ngOnInit(): void {
    if (this.type) {
      this.dashboardService.fetchCurrent(this.type);
    }
  }

}
