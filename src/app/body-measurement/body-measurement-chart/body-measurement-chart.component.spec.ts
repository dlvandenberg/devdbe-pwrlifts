import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BodyMeasurement } from '@app-body-measurement/model/bodyfat.model';
import { MeasurementType } from '@app-body-measurement/model/measurement-type.model';
import { BodyMeasurementService } from '@app-body-measurement/services/bodyfat.service';
import { LINE_CHART_Y_AXIS_ID } from '@app-constants/charts';
import { DestroyObservable } from '@app-shared/destroy.observable';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { Observable, of } from 'rxjs';

import { BodyMeasurementChartComponent } from './body-measurement-chart.component';

describe('BodyfatChartComponent', () => {
  let component: BodyMeasurementChartComponent;
  let destroyObs: DestroyObservable;
  const bodyfatServiceMock: Partial<BodyMeasurementService> = {
    measurements$(measurementType: MeasurementType): Observable<BodyMeasurement[]> {
      return of([]);
    }
  };
  const routeMock: Partial<ActivatedRoute> = { };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DatePipe,
        DestroyObservable,
        { provide: BodyMeasurementService, useValue: bodyfatServiceMock },
        { provide: ActivatedRoute, useValue: routeMock }
      ]
    });

    destroyObs = TestBed.inject(DestroyObservable);
    const route = TestBed.inject(ActivatedRoute);
    const bodyfatService = TestBed.inject(BodyMeasurementService);
    const datePipe = TestBed.inject(DatePipe);
    component = new BodyMeasurementChartComponent(route, bodyfatService, datePipe, destroyObs);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should skip first emitted bodyfatList and correctly update chartdata', async () => {
    const spy = spyOnProperty(bodyfatServiceMock, 'bodyfats$', 'get').and.returnValues(
      of<BodyMeasurement[]>(
        [ { id: '0', measurement: 10, date: new Date('2019-01-01'), time: TimeOfDay.AFTERNOON } ],
        [
          { id: '1', bodyfat: 15.5, date: new Date('2020-01-01'), time: TimeOfDay.MORNING },
          { id: '2', bodyfat: 16.5, date: new Date('2020-02-01'), time: TimeOfDay.MORNING }
        ],
      )
    );

    await component.ngOnInit();

    expect(component.measurementChartData).toEqual([{
      data: [16.5, 15.5],
      label: 'Percentage (%)',
      type: 'line',
      yAxisID: LINE_CHART_Y_AXIS_ID
    }]);
    expect(component.measurementChartLabels).toEqual(['01-02-2020', '01-01-2020']);
  });
});
