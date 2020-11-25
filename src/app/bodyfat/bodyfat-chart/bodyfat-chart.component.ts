import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BodyfatService } from '@app-bodyfat/services/bodyfat.service';
import { LINE_CHART_Y_AXIS_ID } from '@app-constants/charts';
import { ChartDataSets } from 'chart.js';
import { skip, takeUntil } from 'rxjs/operators';
import { DestroyObservable } from '@app-shared/destroy.observable';

@Component({
  selector: 'app-bodyfat-chart',
  templateUrl: './bodyfat-chart.component.html',
  providers: [DatePipe, DestroyObservable]
})
export class BodyfatChartComponent implements OnInit {

  public chartData: ChartDataSets[] = [];
  public chartLabels: string[] = [];


  constructor(
    private readonly bodyfatService: BodyfatService,
    private readonly datePipe: DatePipe,
    private readonly destroy$: DestroyObservable
  ) { }

  ngOnInit(): void {
    this.bodyfatService.bodyfats$.pipe(takeUntil(this.destroy$), skip(1)).subscribe(bodyfatList => {
      const chartData: ChartDataSets[] = [];
      const chartLabels: string[] = [];
      const percentages: number[] = [];
      bodyfatList.forEach(measurement => {
        chartLabels.push(
          this.datePipe.transform(measurement.measuredOn, 'dd-MM-yyyy')
        );
        percentages.push(measurement.bodyfat);
      });

      chartData.push({
        data: percentages.reverse(),
        label: 'Percentage (%)',
        type: 'line',
        yAxisID: LINE_CHART_Y_AXIS_ID
      });

      this.chartData = chartData;
      this.chartLabels = chartLabels.reverse();
    });
  }

}
