import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

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

  public barChartColors: Color[] = [
    {
      backgroundColor: 'rgba(70, 129, 137, 0.7)',
      hoverBackgroundColor: 'rgba(70, 129, 137, 0.8)',
      borderColor: 'rgba(70, 129, 137)',
      borderWidth: 1,
    },
    {
      backgroundColor: 'rgba(253, 202, 64, 0.7)',
      hoverBackgroundColor: 'rgba(253, 202, 64, 0.8)',
      borderColor: 'rgb(253, 202, 64)',
      borderWidth: 1
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
