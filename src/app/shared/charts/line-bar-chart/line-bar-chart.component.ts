import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  BAR_CHART_BACKGROUND_COLOR,
  BAR_CHART_BORDER_COLOR,
  BAR_CHART_BORDER_WIDTH,
  BAR_CHART_HOVER_BACKGROUND_COLOR,
  BAR_CHART_TICKS_COLOR,
  BAR_CHART_Y_AXIS_ID,
  CHART_GRID_LINES_COLOR,
  CHART_X_AXIS_TICKS_COLOR,
  LINE_CHART_BACKGROUND_COLOR,
  LINE_CHART_BORDER_COLOR,
  LINE_CHART_BORDER_WIDTH,
  LINE_CHART_HOVER_BACKGROUND_COLOR,
  LINE_CHART_TICKS_COLOR,
  LINE_CHART_Y_AXIS_ID } from '@app-constants/charts';
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
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: CHART_X_AXIS_TICKS_COLOR
          }
        }
      ],
      yAxes: [
        {
          id: BAR_CHART_Y_AXIS_ID,
          position: 'left',
          ticks: {
            fontColor: BAR_CHART_TICKS_COLOR
          }
        },
        {
          id: LINE_CHART_Y_AXIS_ID,
          position: 'right',
          gridLines: {
            color: CHART_GRID_LINES_COLOR
          },
          ticks: {
            fontColor: LINE_CHART_TICKS_COLOR
          }
        }
      ]
    }
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
      backgroundColor: BAR_CHART_BACKGROUND_COLOR,
      hoverBackgroundColor: BAR_CHART_HOVER_BACKGROUND_COLOR,
      borderColor: BAR_CHART_BORDER_COLOR,
      borderWidth: BAR_CHART_BORDER_WIDTH,
    },
    {
      backgroundColor: LINE_CHART_BACKGROUND_COLOR,
      hoverBackgroundColor: LINE_CHART_HOVER_BACKGROUND_COLOR,
      borderColor: LINE_CHART_BORDER_COLOR,
      borderWidth: LINE_CHART_BORDER_WIDTH
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
