import { TestBed } from '@angular/core/testing';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { BodyMeasurementService } from './body-measurement.service';

import * as fromBodyMeasurementActions from '@app-body-measurement/store/body-measurement.actions';
import { MeasurementType } from '@app-body-measurement/model/measurement-type.model';

const initialState = {
  bodyfat: [
    {
      id: '0',
      measurement: 14.5,
      measurementType: MeasurementType.BODYFAT,
      calories: 3100,
      date: new Date('2020-01-01 00:00:00'),
      time: TimeOfDay.AFTERNOON,
    },
    {
      id: '1',
      measurement: 15.5,
      measurementType: MeasurementType.BODYFAT,
      calories: 3150,
      date: new Date('2020-02-02 00:00:00'),
      time: TimeOfDay.EVENING,
    },
  ],
  weight: [
    {
      id: '0',
      measurement: 89.5,
      measurementType: MeasurementType.WEIGHT,
      calories: 3100,
      date: new Date('2020-01-01 00:00:00'),
      time: TimeOfDay.AFTERNOON,
    },
    {
      id: '1',
      measurement: 90,
      measurementType: MeasurementType.WEIGHT,
      calories: 3150,
      date: new Date('2020-02-02 00:00:00'),
      time: TimeOfDay.EVENING,
    },
  ],
  editing: true,
  editingMeasurement: {
    id: '0',
    measurement: 14.5,
    measurementType: MeasurementType.BODYFAT,
    calories: 3100,
    date: new Date('2020-01-01 00:00:00'),
    time: TimeOfDay.AFTERNOON,
  },
};

describe('BodyMeasurementService', () => {
  let service: BodyMeasurementService;
  const storeMock: Partial<Store> = {
    dispatch(): void {},
    select(): Observable<any> {
      return of(null);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: storeMock }],
    });
    const store = TestBed.inject(Store);
    service = new BodyMeasurementService(store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of bodyfat entries', async () => {
    // Given
    spyOn(storeMock, 'select').and.returnValue(of(initialState));

    // When
    await service
      .measurements$(MeasurementType.BODYFAT)
      .subscribe(bodyfatList => {
        expect(bodyfatList.length).toEqual(2);
        expect(bodyfatList[0]).toEqual({
          id: '0',
          measurement: 14.5,
          measurementType: MeasurementType.BODYFAT,
          calories: 3100,
          date: new Date('2020-01-01 00:00:00'),
          time: TimeOfDay.AFTERNOON,
        });
        expect(bodyfatList[1]).toEqual({
          id: '1',
          measurement: 15.5,
          measurementType: MeasurementType.BODYFAT,
          calories: 3150,
          date: new Date('2020-02-02 00:00:00'),
          time: TimeOfDay.EVENING,
        });
      });
  });

  it('should return if state is in editing', async () => {
    // Given
    spyOn(storeMock, 'select').and.returnValue(of(initialState));

    // When
    await service.editing$.subscribe(editing => {
      expect(editing).toBeTrue();
    });
  });

  it('should return the bodyfat entry being edited', async () => {
    // Given
    spyOn(storeMock, 'select').and.returnValue(of(initialState));

    // When
    await service.editingMeasurement$.subscribe(editingBodyfat => {
      expect(editingBodyfat).toEqual({
        id: '0',
        measurement: 14.5,
        measurementType: MeasurementType.BODYFAT,
        calories: 3100,
        date: new Date('2020-01-01 00:00:00'),
        time: TimeOfDay.AFTERNOON,
      });
    });
  });

  it('should call startEditing', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.startEditing();

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyMeasurementActions.startEditing()
    );
  });

  it('should call startEditingExisting', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.startEditingExisting({
      id: '2',
      measurement: 17.4,
      measurementType: MeasurementType.BODYFAT,
      calories: 3100,
      date: new Date('2020-10-11 00:00:00'),
      time: TimeOfDay.AFTERNOON,
    });

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyMeasurementActions.startEditingExisting({
        measurement: {
          id: '2',
          measurement: 17.4,
          measurementType: MeasurementType.BODYFAT,
          calories: 3100,
          date: new Date('2020-10-11 00:00:00'),
          time: TimeOfDay.AFTERNOON,
        },
      })
    );
  });

  it('should call cancelEditing', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.cancelEditing();

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyMeasurementActions.cancelEditing()
    );
  });

  it('should call createBodyMeasurement', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.create({
      measurement: 18.4,
      measurementType: MeasurementType.BODYFAT,
      calories: 3150,
      date: new Date('2020-11-28 00:00:00'),
      time: TimeOfDay.MORNING,
    });

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyMeasurementActions.createBodyMeasurement({
        measurement: 18.4,
        measurementType: MeasurementType.BODYFAT,
        calories: 3150,
        date: new Date('2020-11-28 00:00:00'),
        time: TimeOfDay.MORNING,
      })
    );
  });

  it('should call deleteBodyMeasurement', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.delete(MeasurementType.BODYFAT, '1');

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyMeasurementActions.deleteBodyMeasurement({
        measurementType: MeasurementType.BODYFAT,
        id: '1',
      })
    );
  });

  it('should call updateBodyMeasurement', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.update({
      id: '4',
      measurement: 14.4,
      measurementType: MeasurementType.BODYFAT,
      calories: 3100,
      date: new Date('2020-11-18 00:00:00'),
      time: TimeOfDay.EVENING,
    });

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyMeasurementActions.updateBodyMeasurement({
        id: '4',
        measurement: 14.4,
        measurementType: MeasurementType.BODYFAT,
        calories: 3100,
        date: new Date('2020-11-18 00:00:00'),
        time: TimeOfDay.EVENING,
      })
    );
  });

  it('should call fetchBodyMeasurement', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.fetchBodyMeasurements(MeasurementType.BODYFAT);

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyMeasurementActions.fetchBodyMeasurements({
        measurementType: MeasurementType.BODYFAT,
      })
    );
  });
});
