import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-line-bar-chart',
  templateUrl: './line-bar-chart.component.html',
  styleUrls: ['./line-bar-chart.component.scss']
})
export class LineBarChartComponent implements OnInit {

  @Input()
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartType: ChartType = 'bar';

  @Input()
  public barChartLegend = true;

  @Input()
  public barChartData: ChartDataSets[] = [];

  @Input()
  public barChartLabels: string[] = [];

  @Output()
  public hovered = new EventEmitter();

  @Output()
  public clicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
