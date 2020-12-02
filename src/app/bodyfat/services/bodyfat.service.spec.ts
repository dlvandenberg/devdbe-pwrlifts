import { TestBed } from '@angular/core/testing';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { BodyfatService } from './bodyfat.service';

import * as fromBodyfatActions from '@app-bodyfat/store/bodyfat.actions';

describe('BodyfatService', () => {
  let service: BodyfatService;
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
    service = new BodyfatService(store);
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
            measuredOn: new Date('2020-01-01 00:00:00'),
            partOfDayMeasured: TimeOfDay.AFTERNOON,
          },
          {
            id: '1',
            bodyfat: 15.5,
            measuredOn: new Date('2020-02-02 00:00:00'),
            partOfDayMeasured: TimeOfDay.EVENING,
          },
        ],
        editing: true,
        editingBodyfat: {
          id: '0',
          bodyfat: 14.5,
          measuredOn: new Date('2020-01-01 00:00:00'),
          partOfDayMeasured: TimeOfDay.AFTERNOON,
        },
      })
    );

    // When
    await service.bodyfats$.subscribe(bodyfatList => {
      expect(bodyfatList.length).toEqual(2);
      expect(bodyfatList[0]).toEqual({
        id: '0',
        bodyfat: 14.5,
        measuredOn: new Date('2020-01-01 00:00:00'),
        partOfDayMeasured: TimeOfDay.AFTERNOON,
      });
      expect(bodyfatList[1]).toEqual({
        id: '1',
        bodyfat: 15.5,
        measuredOn: new Date('2020-02-02 00:00:00'),
        partOfDayMeasured: TimeOfDay.EVENING,
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
            measuredOn: new Date('2020-01-01 00:00:00'),
            partOfDayMeasured: TimeOfDay.AFTERNOON,
          },
          {
            id: '1',
            bodyfat: 15.5,
            measuredOn: new Date('2020-02-02 00:00:00'),
            partOfDayMeasured: TimeOfDay.EVENING,
          },
        ],
        editing: true,
        editingBodyfat: {
          id: '0',
          bodyfat: 14.5,
          measuredOn: new Date('2020-01-01 00:00:00'),
          partOfDayMeasured: TimeOfDay.AFTERNOON,
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
            measuredOn: new Date('2020-01-01 00:00:00'),
            partOfDayMeasured: TimeOfDay.AFTERNOON,
          },
          {
            id: '1',
            bodyfat: 15.5,
            measuredOn: new Date('2020-02-02 00:00:00'),
            partOfDayMeasured: TimeOfDay.EVENING,
          },
        ],
        editing: true,
        editingBodyfat: {
          id: '0',
          bodyfat: 14.5,
          measuredOn: new Date('2020-01-01 00:00:00'),
          partOfDayMeasured: TimeOfDay.AFTERNOON,
        },
      })
    );

    // When
    await service.editingBodyfat$.subscribe(editingBodyfat => {
      expect(editingBodyfat).toEqual({
        id: '0',
        bodyfat: 14.5,
        measuredOn: new Date('2020-01-01 00:00:00'),
        partOfDayMeasured: TimeOfDay.AFTERNOON,
      });
    });
  });

  it('should call startEditing', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.startEditing();

    expect(dispatch).toHaveBeenCalledWith(fromBodyfatActions.startEditing());
  });

  it('should call startEditingExisting', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.startEditingExisting({
      id: '2',
      bodyfat: 17.4,
      measuredOn: new Date('2020-10-11 00:00:00'),
      partOfDayMeasured: TimeOfDay.AFTERNOON,
    });

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyfatActions.startEditingExisting({
        bodyfat: {
          id: '2',
          bodyfat: 17.4,
          measuredOn: new Date('2020-10-11 00:00:00'),
          partOfDayMeasured: TimeOfDay.AFTERNOON,
        },
      })
    );
  });

  it('should call cancelEditing', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.cancelEditing();

    expect(dispatch).toHaveBeenCalledWith(fromBodyfatActions.cancelEditing());
  });

  it('should call createBodyfat', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.create({
      bodyfat: 18.4,
      measuredOn: new Date('2020-11-28 00:00:00'),
      partOfDayMeasured: TimeOfDay.MORNING,
    });

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyfatActions.createBodyfat({
        bodyfat: 18.4,
        measuredOn: new Date('2020-11-28 00:00:00'),
        partOfDayMeasured: TimeOfDay.MORNING,
      })
    );
  });

  it('should call deleteBodyfat', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.delete('1');

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyfatActions.deleteBodyfat({
        id: '1',
      })
    );
  });

  it('should call updateBodyfat', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.update({
      id: '4',
      bodyfat: 14.4,
      measuredOn: new Date('2020-11-18 00:00:00'),
      partOfDayMeasured: TimeOfDay.EVENING,
    });

    expect(dispatch).toHaveBeenCalledWith(
      fromBodyfatActions.updateBodyfat({
        id: '4',
        bodyfat: 14.4,
        measuredOn: new Date('2020-11-18 00:00:00'),
        partOfDayMeasured: TimeOfDay.EVENING,
      })
    );
  });

  it('should call fetchBodyfats', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.fetchBodyfats();

    expect(dispatch).toHaveBeenCalledWith(fromBodyfatActions.fetchBodyfats());
  });
});
