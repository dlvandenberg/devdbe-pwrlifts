import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BodyMeasurement } from '@app-body-measurement/model/body-measurement.model';
import { MeasurementType } from '@app-body-measurement/model/measurement-type.model';
import { BodyMeasurementService } from '@app-body-measurement/services/body-measurement.service';
import { BAR_CHART_Y_AXIS_ID, LINE_CHART_Y_AXIS_ID } from '@app-constants/charts';
import { DestroyObservable } from '@app-shared/destroy.observable';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { Observable, of } from 'rxjs';

import { BodyMeasurementChartComponent } from './body-measurement-chart.component';

describe('BodyfatChartComponent', () => {
  let component: BodyMeasurementChartComponent;
  let destroyObs: DestroyObservable;
  const bodyMeasurementServiceMock: Partial<BodyMeasurementService> = {
    measurements$(
      measurementType: MeasurementType
    ): Observable<BodyMeasurement[]> {
      return of(
        [
          {
            id: '0',
            measurementType: MeasurementType.BODYFAT,
            measurement: 10,
            calories: 3100,
            date: new Date('2019-01-01'),
            time: TimeOfDay.AFTERNOON,
          },
        ],
        [
          {
            id: '1',
            measurementType: MeasurementType.BODYFAT,
            measurement: 15.5,
            calories: 4100,
            date: new Date('2020-01-01'),
            time: TimeOfDay.MORNING,
          },
          {
            id: '2',
            measurementType: MeasurementType.BODYFAT,
            measurement: 16.5,
            calories: 4300,
            date: new Date('2020-02-01'),
            time: TimeOfDay.MORNING,
          },
        ]
      );
    },
  };
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        DatePipe,
        DestroyObservable,
        { provide: BodyMeasurementService, useValue: bodyMeasurementServiceMock }
      ],
    });

    destroyObs = TestBed.inject(DestroyObservable);
    route = TestBed.inject(ActivatedRoute);
    const bodyMeasurementService = TestBed.inject(BodyMeasurementService);
    const datePipe = TestBed.inject(DatePipe);
    component = new BodyMeasurementChartComponent(
      route,
      bodyMeasurementService,
      datePipe,
      destroyObs
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should skip first emitted bodyfatList and correctly update chartdata', async () => {
    const spy = spyOn(bodyMeasurementServiceMock, 'measurements$').and.callThrough();
    route.params = of({ type: 'bodyfat'});
    await component.ngOnInit();

    expect(spy).toHaveBeenCalled();

    expect(component.measurementChartData).toEqual([
      {
        data: [4300, 4100],
        label: 'Calories (kcal)',
        stack: 'a',
        yAxisID: BAR_CHART_Y_AXIS_ID
      },
      {
        data: [16.5, 15.5],
        label: 'Bodyfat (%)',
        type: 'line',
        yAxisID: LINE_CHART_Y_AXIS_ID,
      },
    ]);
    expect(component.measurementChartLabels).toEqual([
      '01-02-2020',
      '01-01-2020',
    ]);
  });
});
