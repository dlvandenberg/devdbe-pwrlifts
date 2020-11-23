import { Component, Input } from '@angular/core';
import {
  CHART_X_AXIS_TICKS_COLOR,
  LINE_CHART_Y_AXIS_ID,
  CHART_GRID_LINES_COLOR,
  LINE_CHART_TICKS_COLOR,
  LINE_CHART_BACKGROUND_COLOR,
  LINE_CHART_HOVER_BACKGROUND_COLOR,
  LINE_CHART_BORDER_COLOR,
  LINE_CHART_BORDER_WIDTH
} from '@app-constants/charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {

  public options: ChartOptions = {
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

  public chartType: ChartType = 'line';

  public showLegend = true;

  @Input()
  public data: ChartDataSets[] = [];

  @Input()
  public labels: string[] = [];

  public colors: Color[] = [
    {
      backgroundColor: LINE_CHART_BACKGROUND_COLOR,
      hoverBackgroundColor: LINE_CHART_HOVER_BACKGROUND_COLOR,
      borderColor: LINE_CHART_BORDER_COLOR,
      borderWidth: LINE_CHART_BORDER_WIDTH
    }
  ];
}
