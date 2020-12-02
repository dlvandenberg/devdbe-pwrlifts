import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LINE_CHART_Y_AXIS_ID } from '@app-constants/charts';
import { ChartDataSets } from 'chart.js';
import { merge, Subject } from 'rxjs';
import { filter, map, skip, takeUntil, tap } from 'rxjs/operators';
import { DestroyObservable } from 'src/app/shared/destroy.observable';
import { Exercise } from '@app-one-rep-max/model/exercise.enum';
import { OneRepMaxService } from '@app-one-rep-max/services/one-rep-max.service';

@Component({
  selector: 'app-one-rep-max-chart',
  templateUrl: './one-rep-max-chart.component.html',
  providers: [DatePipe, DestroyObservable],
})
export class OneRepMaxChartComponent implements OnInit {
  chartData: ChartDataSets[] = [];
  chartLabels: string[] = [];
  private newRouteParam$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly oneRepMaxService: OneRepMaxService,
    private readonly datePipe: DatePipe,
    private readonly destroy$: DestroyObservable
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        tap(_ => this.newRouteParam$.next()),
        map((params) => Exercise[params.exercise]),
        filter(exercise => exercise != null)
      )
      .subscribe((exercise) => {
        this.oneRepMaxService
          .oneRepMaxes$(exercise)
          .pipe(takeUntil(merge(this.newRouteParam$, this.destroy$)), skip(1)) // Skip 1 because root component triggers a refetch
          .subscribe(
            (oneRepMaxList) => {
            const data: ChartDataSets[] = [];
            const labels: string[] = [];
            const records: number[] = [];

            oneRepMaxList.forEach((record) => {
              labels.push(this.datePipe.transform(record.date, 'dd-MM-yyyy'));
              records.push(record.oneRepMax);
            });

            data.push({
              data: records.reverse(),
              label: '1RM',
              type: 'line',
              yAxisID: LINE_CHART_Y_AXIS_ID,
            });

            this.chartData = data;
            this.chartLabels = labels.reverse();
          }
        );
      });
  }
}
