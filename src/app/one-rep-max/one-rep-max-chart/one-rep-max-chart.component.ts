import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LINE_CHART_Y_AXIS_ID } from '@app-constants/charts';
import { ChartDataSets } from 'chart.js';
import { Exercise } from '../model/exercise.enum';
import { OneRepMaxService } from '../services/one-rep-max.service';

@Component({
  selector: 'app-one-rep-max-chart',
  templateUrl: './one-rep-max-chart.component.html',
  styleUrls: ['./one-rep-max-chart.component.scss'],
  providers: [ DatePipe ]
})
export class OneRepMaxChartComponent implements OnInit {
  chartData: ChartDataSets[] = [];
  chartLabels: string[] = [];

  @Input()
  public exercise: Exercise;

  constructor(
    private readonly oneRepMaxService: OneRepMaxService,
    private readonly datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.oneRepMaxService.oneRepMaxes$(this.exercise).subscribe(oneRepMaxList => {
      const data: ChartDataSets[] = [];
      const labels: string[] = [];
      const records: number[] = [];

      oneRepMaxList.forEach(record => {
        labels.push(this.datePipe.transform(record.date, 'dd-MM-yyyy'));
        records.push(record.oneRepMax);
      });

      data.push({
        data: records.reverse(),
        label: '1RM',
        type: 'line',
        yAxisID: LINE_CHART_Y_AXIS_ID
      });

      this.chartData = data;
      this.chartLabels = labels.reverse();
    });
  }

}
