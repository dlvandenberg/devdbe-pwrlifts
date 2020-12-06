import { TestBed } from '@angular/core/testing';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { BodyMeasurementService } from './bodyfat.service';

import * as fromBodyMeasurementActions from '@app-body-measurement/store/body-measurement.actions';

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
    spyOn(storeMock, 'select').and.returnValue(
      of({
        bodyfats: [
          {
            id: '0',
            bodyfat: 14.5,
            date: new Date('2020-01-01 00:00:00'),
            time: TimeOfDay.AFTERNOON,
          },
          {
            id: '1',
            bodyfat: 15.5,
            date: new Date('2020-02-02 00:00:00'),
            time: TimeOfDay.EVENING,
          },
        ],
        editing: true,
        editingBodyfat: {
          id: '0',
          bodyfat: 14.5,
          date: new Date('2020-01-01 00:00:00'),
          time: TimeOfDay.AFTERNOON,
        },
      })
    );

    // When
    await service.measurements$.subscribe(bodyfatList => {
      expect(bodyfatList.length).toEqual(2);
      expect(bodyfatList[0]).toEqual({
        id: '0',
        bodyfat: 14.5,
        date: new Date('2020-01-01 00:00:00'),
        time: TimeOfDay.AFTERNOON,
      });
      expect(bodyfatList[1]).toEqual({
        id: '1',
        bodyfat: 15.5,
        date: new Date('2020-02-02 00:00:00'),
        time: TimeOfDay.EVENING,
      });
    });
  });

  it('should return if state is in editing', async () => {
    // Given
    spyOn(storeMock, 'select').and.returnValue(
      of({
        bodyfats: [
          {
            id: '0',
            bodyfat: 14.5,
            date: new Date('2020-01-01 00:00:00'),
            time: TimeOfDay.AFTERNOON,
          },
          {
            id: '1',
            bodyfat: 15.5,
            date: new Date('2020-02-02 00:00:00'),
            time: TimeOfDay.EVENING,
          },
        ],
        editing: true,
        editingBodyfat: {
          id: '0',
          bodyfat: 14.5,
          date: new Date('2020-01-01 00:00:00'),
          time: TimeOfDay.AFTERNOON,
        },
      })
    );

    // When
    await service.editing$.subscribe(editing => {
      expect(editing).toBeTrue();
    });
  });

  it('should return the bodyfat entry being edited', async () => {
    // Given
    spyOn(storeMock, 'select').and.returnValue(
      of({
        bodyfats: [
          {
            id: '0',
            bodyfat: 14.5,
            date: new Date('2020-01-01 00:00:00'),
            time: TimeOfDay.AFTERNOON,
          },
          {
            id: '1',
            bodyfat: 15.5,
            date: new Date('2020-02-02 00:00:00'),
            time: TimeOfDay.EVENING,
          },
        ],
        editing: true,
        editingBodyfat: {
          id: '0',
          bodyfat: 14.5,
          date: new Date('2020-01-01 00:00:00'),
          time: TimeOfDay.AFTERNOON,
        },
      })
    );

    // When
    await service.editingMeasurement$.subscribe(editingBodyfat => {
      expect(editingBodyfat).toEqual({
        id: '0',
        bodyfat: 14.5,
        date: new Date('2020-01-01 00:00:00'),
        time: TimeOfDay.AFTERNOON,
      });
    });
  });

  it('should call startEditing', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.startEditing();

    expect(dispatch).toHaveBeenCalledWith(fromBodyMeasurementActions.startEditing());
  });

  it('should call startEditingExisting', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.startEditingExisting({
      id: '2',
      measurement: 17.4,
      date: new Date('2020-10-11 00:00:00'),
      time: TimeOfDay.AFTERNOON,
    });

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyMeasurementActions.startEditingExisting({
        bodyfat: {
          id: '2',
          measurement: 17.4,
          date: new Date('2020-10-11 00:00:00'),
          time: TimeOfDay.AFTERNOON,
        },
      })
    );
  });

  it('should call cancelEditing', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.cancelEditing();

    expect(dispatch).toHaveBeenCalledWith(fromBodyMeasurementActions.cancelEditing());
  });

  it('should call createBodyfat', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.create({
      measurement: 18.4,
      date: new Date('2020-11-28 00:00:00'),
      time: TimeOfDay.MORNING,
    });

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyMeasurementActions.createBodyfat({
        bodyfat: 18.4,
        date: new Date('2020-11-28 00:00:00'),
        time: TimeOfDay.MORNING,
      })
    );
  });

  it('should call deleteBodyfat', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.delete('1');

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyMeasurementActions.deleteBodyfat({
        id: '1',
      })
    );
  });

  it('should call updateBodyfat', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.update({
      id: '4',
      measurement: 14.4,
      date: new Date('2020-11-18 00:00:00'),
      time: TimeOfDay.EVENING,
    });

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyMeasurementActions.updateBodyfat({
        id: '4',
        bodyfat: 14.4,
        date: new Date('2020-11-18 00:00:00'),
        time: TimeOfDay.EVENING,
      })
    );
  });

  it('should call fetchBodyfats', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.fetchBodyMeasurements();

    expect(dispatch).toHaveBeenCalledWith(fromBodyMeasurementActions.fetchBodyfats());
  });
});
