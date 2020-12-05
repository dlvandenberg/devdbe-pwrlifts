import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bodyfat } from '@app-bodyfat/model/bodyfat.model';
import { BodyfatService } from '@app-bodyfat/services/bodyfat.service';
import { LINE_CHART_Y_AXIS_ID } from '@app-constants/charts';
import { DestroyObservable } from '@app-shared/destroy.observable';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { Observable, of } from 'rxjs';

import { BodyfatChartComponent } from './bodyfat-chart.component';

describe('BodyfatChartComponent', () => {
  let component: BodyfatChartComponent;
  let destroyObs: DestroyObservable;
  const bodyfatServiceMock: Partial<BodyfatService> = {
    get bodyfats$(): Observable<Bodyfat[]> {
      return of([]);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DatePipe,
        DestroyObservable,
        { provide: BodyfatService, useValue: bodyfatServiceMock }
      ]
    });

    destroyObs = TestBed.inject(DestroyObservable);
    const bodyfatService = TestBed.inject(BodyfatService);
    const datePipe = TestBed.inject(DatePipe);
    component = new BodyfatChartComponent(bodyfatService, datePipe, destroyObs);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should skip first emitted bodyfatList and correctly update chartdata', async () => {
    const spy = spyOnProperty(bodyfatServiceMock, 'bodyfats$', 'get').and.returnValues(
      of<Bodyfat[]>(
        [ { id: '0', bodyfat: 10, date: new Date('2019-01-01'), time: TimeOfDay.AFTERNOON } ],
        [
          { id: '1', bodyfat: 15.5, date: new Date('2020-01-01'), time: TimeOfDay.MORNING },
          { id: '2', bodyfat: 16.5, date: new Date('2020-02-01'), time: TimeOfDay.MORNING }
        ],
      )
    );

    await component.ngOnInit();

    expect(component.chartData).toEqual([{
      data: [16.5, 15.5],
      label: 'Percentage (%)',
      type: 'line',
      yAxisID: LINE_CHART_Y_AXIS_ID
    }]);
    expect(component.chartLabels).toEqual(['01-02-2020', '01-01-2020']);
  });
});
