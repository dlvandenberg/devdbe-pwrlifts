import { DatePipe, DecimalPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LINE_CHART_Y_AXIS_ID } from '@app-constants/charts';
import { Exercise } from '@app-one-rep-max/model/exercise.enum';
import { OneRepMax } from '@app-one-rep-max/model/one-rep-max.model';
import { OneRepMaxService } from '@app-one-rep-max/services/one-rep-max.service';
import { DestroyObservable } from '@app-shared/destroy.observable';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { Observable, of } from 'rxjs';

import { OneRepMaxChartComponent } from './one-rep-max-chart.component';

describe('OneRepMaxChartComponent', () => {
  let component: OneRepMaxChartComponent;
  let destroyObs: DestroyObservable;
  const oneRepMaxServiceMock: Partial<OneRepMaxService> = {
    oneRepMaxes$(exercise: Exercise): Observable<OneRepMax[]> {
      return of([]);
    },
  };
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        DatePipe,
        DecimalPipe,
        DestroyObservable,
        { provide: OneRepMaxService, useValue: oneRepMaxServiceMock },
      ],
    });

    route = TestBed.inject(ActivatedRoute);
    destroyObs = TestBed.inject(DestroyObservable);
    const bodyfatService = TestBed.inject(OneRepMaxService);
    const datePipe = TestBed.inject(DatePipe);
    const decimalPipe = TestBed.inject(DecimalPipe);
    component = new OneRepMaxChartComponent(
      route,
      bodyfatService,
      datePipe,
      decimalPipe,
      destroyObs
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not do anything if route has no params', async () => {
    route.params = of({});
    const oneRepMaxes$ = spyOn(oneRepMaxServiceMock, 'oneRepMaxes$');

    await component.ngOnInit();

    expect(oneRepMaxes$).not.toHaveBeenCalled();
    expect(component.chartData).toEqual([]);
    expect(component.chartLabels).toEqual([]);
  });

  it('should not do anything if route has no valid exercise param', async () => {
    route.params = of({ exercise: 'test' });
    const oneRepMaxes$ = spyOn(oneRepMaxServiceMock, 'oneRepMaxes$');

    await component.ngOnInit();

    expect(oneRepMaxes$).not.toHaveBeenCalled();
    expect(component.chartData).toEqual([]);
    expect(component.chartLabels).toEqual([]);
  });

  it('should skip first 1rm list and build up chart data correctly', async () => {
    route.params = of({ exercise: 'squat' });
    spyOn(oneRepMaxServiceMock, 'oneRepMaxes$').and.returnValue(
      of<OneRepMax[]>(
        [
          {
            id: '0',
            oneRepMax: 120,
            weight: 120,
            reps: 1,
            calculated: false,
            date: new Date('2020-02-02'),
            exercise: Exercise.squat,
            rpe: 10,
            time: TimeOfDay.AFTERNOON,
          },
        ],
        [
          {
            id: '0',
            oneRepMax: 145.5,
            weight: 130,
            reps: 5,
            calculated: true,
            date: new Date('2020-10-01'),
            exercise: Exercise.squat,
            rpe: 8,
            time: TimeOfDay.AFTERNOON,
          },
          {
            id: '1',
            oneRepMax: 160,
            weight: 160,
            reps: 1,
            calculated: false,
            date: new Date('2020-01-01'),
            exercise: Exercise.squat,
            rpe: 10,
            time: TimeOfDay.EVENING,
          },
        ]
      )
    );

    await component.ngOnInit();

    expect(component.chartData).toEqual([
      {
        data: [160, 145.5],
        label: '1RM',
        type: 'line',
        yAxisID: LINE_CHART_Y_AXIS_ID,
      },
    ]);
    expect(component.chartLabels).toEqual([
      '01-01-2020', '01-10-2020'
    ]);
  });
});
