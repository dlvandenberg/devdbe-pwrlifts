import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BAR_CHART_Y_AXIS_ID, LINE_CHART_Y_AXIS_ID } from '@app-constants/charts';
import { WeightService } from '@app-weight/services/weight.service';
import { ChartDataSets } from 'chart.js';
import { skip, takeUntil } from 'rxjs/operators';
import { DestroyObservable } from '@app-shared/destroy.observable';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  providers: [ DatePipe, DestroyObservable ]
})
export class WeightChartComponent implements OnInit {
  weightChartData: ChartDataSets[] = [];
  weightChartLabels: string[] = [];

  constructor(
    private readonly destroy$: DestroyObservable,
    private readonly weightService: WeightService,
    private readonly datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.weightService.weights$.pipe(takeUntil(this.destroy$), skip(1)).subscribe(weightList => {
      const chartData: ChartDataSets[] = [];
      const chartLabels: string[] = [];
      const weights: number[] = [];
      const calories: number[] = [];
      weightList.forEach((weight) => {
        chartLabels.push(
          this.datePipe.transform(weight.measuredOn, 'dd-MM-yyyy')
        );
        weights.push(weight.weight);
        calories.push(weight.calories);
      });

      chartData.push({
        data: calories.reverse(),
        label: 'Calories (kcal)',
        stack: 'a',
        yAxisID: BAR_CHART_Y_AXIS_ID
      });
      chartData.push({
        data: weights.reverse(),
        label: 'Weight (kg)',
        type: 'line',
        yAxisID: LINE_CHART_Y_AXIS_ID
      });

      this.weightChartData = chartData;
      this.weightChartLabels = chartLabels.reverse();
    });
  }
}
