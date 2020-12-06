import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BodyMeasurementService } from '@app-body-measurement/services/bodyfat.service';
import {
  BAR_CHART_Y_AXIS_ID,
  LINE_CHART_Y_AXIS_ID,
} from '@app-constants/charts';
import { ChartDataSets } from 'chart.js';
import { filter, map, skip, takeUntil, tap } from 'rxjs/operators';
import { DestroyObservable } from '@app-shared/destroy.observable';
import { ActivatedRoute } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { MeasurementType } from '@app-body-measurement/model/measurement-type.model';

@Component({
  selector: 'app-body-measurement-chart',
  templateUrl: './body-measurement-chart.component.html',
  providers: [DatePipe, DestroyObservable],
})
export class BodyMeasurementChartComponent implements OnInit {
  public measurementChartData: ChartDataSets[] = [];
  public measurementChartLabels: string[] = [];
  private newRouteParam$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bodyMeasurementService: BodyMeasurementService,
    private readonly datePipe: DatePipe,
    private readonly destroy$: DestroyObservable
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        tap(_ => this.newRouteParam$.next()),
        map(params => MeasurementType.from(params.type)),
        filter(measurementType => measurementType != null)
      )
      .subscribe(measurementType => {
        this.bodyMeasurementService
          .measurements$(measurementType)
          .pipe(takeUntil(merge(this.newRouteParam$, this.destroy$)), skip(1))
          .subscribe(measurementList => {
            const chartData: ChartDataSets[] = [];
            const chartLabels: string[] = [];
            const measurements: number[] = [];
            const calories: number[] = [];
            measurementList.forEach(measurement => {
              chartLabels.push(
                this.datePipe.transform(measurement.date, 'dd-MM-yyyy')
              );
              measurements.push(measurement.measurement);
              calories.push(measurement.calories);
            });

            chartData.push({
              data: calories.reverse(),
              label: 'Calories (kcal)',
              stack: 'a',
              yAxisID: BAR_CHART_Y_AXIS_ID,
            });
            chartData.push({
              data: measurements.reverse(),
              label:
                measurementType.capitalizedName +
                ' (' +
                measurementType.unitSymbol +
                ')',
              type: 'line',
              yAxisID: LINE_CHART_Y_AXIS_ID,
            });

            this.measurementChartData = chartData;
            this.measurementChartLabels = chartLabels.reverse();
          });
      });
  }
}
