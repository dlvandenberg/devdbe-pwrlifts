import { TestBed } from '@angular/core/testing';
import { Exercise } from '@app-one-rep-max/model/exercise.enum';
import * as fromOneRepMaxActions from '@app-one-rep-max/store/one-rep-max.actions';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { OneRepMaxService } from './one-rep-max.service';

const initialState = {
  squat: [
    {
      id: '0',
      exercise: Exercise.squat,
      weight: 130,
      reps: 5,
      oneRepMax: 150,
      calculated: true,
      date: new Date('2020-01-01 00:00:00'),
      time: TimeOfDay.AFTERNOON,
      rpe: 8,
    },
    {
      id: '1',
      exercise: Exercise.squat,
      weight: 120,
      reps: 3,
      oneRepMax: 140,
      calculated: true,
      date: new Date('2020-01-02 00:00:00'),
      time: TimeOfDay.AFTERNOON,
      rpe: 8.5,
    },
  ],
  deadlift: [
    {
      id: '2',
      exercise: Exercise.deadlift,
      weight: 140,
      reps: 1,
      oneRepMax: 140,
      calculated: false,
      date: new Date('2020-01-03 00:00:00'),
      time: TimeOfDay.EVENING,
      rpe: 9.5,
    },
    {
      id: '3',
      exercise: Exercise.deadlift,
      weight: 150,
      reps: 5,
      oneRepMax: 197.5,
      calculated: true,
      date: new Date('2020-01-04 00:00:00'),
      time: TimeOfDay.MORNING,
      rpe: 10,
    },
  ],
  benchpress: [
    {
      id: '4',
      exercise: Exercise.benchpress,
      weight: 100,
      reps: 5,
      oneRepMax: 122.5,
      calculated: true,
      date: new Date('2020-01-05 00:00:00'),
      time: TimeOfDay.AFTERNOON,
      rpe: 9,
    },
    {
      id: '5',
      exercise: Exercise.benchpress,
      weight: 95,
      reps: 10,
      oneRepMax: 120,
      calculated: true,
      date: new Date('2020-01-06 00:00:00'),
      time: TimeOfDay.AFTERNOON,
      rpe: 8.5,
    },
  ],
  editing: true,
  editingOneRepMax: {
    id: '3',
    exercise: Exercise.deadlift,
    weight: 150,
    reps: 5,
    oneRepMax: 197.5,
    calculated: true,
    date: new Date('2020-01-04 00:00:00'),
    time: TimeOfDay.MORNING,
    rpe: 10,
  },
};

describe('OneRepMaxService', () => {
  let service: OneRepMaxService;
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
    service = new OneRepMaxService(store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the editing state', async () => {
    spyOn(storeMock, 'select').and.returnValue(of(initialState));

    await service.editing$.subscribe(editing => expect(editing).toBeTrue());
  });

  it('should return the editing one rep max state', async () => {
    spyOn(storeMock, 'select').and.returnValue(of(initialState));

    await service.editingOneRepMax$.subscribe(editingOneRepMax => {
      expect(editingOneRepMax.id).toEqual('3');
      expect(editingOneRepMax.exercise).toEqual(Exercise.deadlift);
      expect(editingOneRepMax.weight).toEqual(150);
      expect(editingOneRepMax.reps).toEqual(5);
      expect(editingOneRepMax.oneRepMax).toEqual(197.5);
      expect(editingOneRepMax.calculated).toBeTrue();
      expect(editingOneRepMax.date).toEqual(new Date('2020-01-04 00:00:00'));
      expect(editingOneRepMax.time).toEqual(TimeOfDay.MORNING);
      expect(editingOneRepMax.rpe).toEqual(10);
    });
  });

  it('should return the one rep max list for squat', async () => {
    spyOn(storeMock, 'select').and.returnValue(of(initialState));

    await service.oneRepMaxes$(Exercise.squat).subscribe(oneRepMaxList => {
      expect(oneRepMaxList).toContain(
        {
          id: '0',
          exercise: Exercise.squat,
          weight: 130,
          reps: 5,
          oneRepMax: 150,
          calculated: true,
          date: new Date('2020-01-01 00:00:00'),
          time: TimeOfDay.AFTERNOON,
          rpe: 8,
        },
        {
          id: '1',
          exercise: Exercise.squat,
          weight: 120,
          reps: 3,
          oneRepMax: 140,
          calculated: true,
          date: new Date('2020-01-02 00:00:00'),
          time: TimeOfDay.AFTERNOON,
          rpe: 8.5,
        }
      );
    });
  });

  it('should return the one rep max list for deadlift', async () => {
    spyOn(storeMock, 'select').and.returnValue(of(initialState));

    await service.oneRepMaxes$(Exercise.deadlift).subscribe(oneRepMaxList => {
      expect(oneRepMaxList).toContain(
        {
          id: '2',
          exercise: Exercise.deadlift,
          weight: 140,
          reps: 1,
          oneRepMax: 140,
          calculated: false,
          date: new Date('2020-01-03 00:00:00'),
          time: TimeOfDay.EVENING,
          rpe: 9.5,
        },
        {
          id: '3',
          exercise: Exercise.deadlift,
          weight: 150,
          reps: 5,
          oneRepMax: 197.5,
          calculated: true,
          date: new Date('2020-01-04 00:00:00'),
          time: TimeOfDay.MORNING,
          rpe: 10,
        }
      );
    });
  });

  it('should return the one rep max list for benchpress', async () => {
    spyOn(storeMock, 'select').and.returnValue(of(initialState));

    await service.oneRepMaxes$(Exercise.benchpress).subscribe(oneRepMaxList => {
      expect(oneRepMaxList).toContain(
        {
          id: '4',
          exercise: Exercise.benchpress,
          weight: 100,
          reps: 5,
          oneRepMax: 122.5,
          calculated: true,
          date: new Date('2020-01-05 00:00:00'),
          time: TimeOfDay.AFTERNOON,
          rpe: 9,
        },
        {
          id: '5',
          exercise: Exercise.benchpress,
          weight: 95,
          reps: 10,
          oneRepMax: 120,
          calculated: true,
          date: new Date('2020-01-06 00:00:00'),
          time: TimeOfDay.AFTERNOON,
          rpe: 8.5,
        }
      );
    });
  });

  it('should dispatch fetchOneRepMaxes action', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.fetchOneRepMaxes(Exercise.squat);

    expect(dispatch).toHaveBeenCalledWith(
      fromOneRepMaxActions.fetchOneRepMaxes({ exercise: Exercise.squat })
    );
  });

  it('should dispatch createOneRepMax action', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.create({
      exercise: Exercise.benchpress,
      weight: 110,
      reps: 2,
      oneRepMax: 122.5,
      calculated: true,
      date: new Date('2020-10-10 00:00:00'),
      time: TimeOfDay.AFTERNOON,
      rpe: 9,
    });

    expect(dispatch).toHaveBeenCalledWith(
      fromOneRepMaxActions.createOneRepMax({
        exercise: Exercise.benchpress,
        weight: 110,
        reps: 2,
        oneRepMax: 122.5,
        calculated: true,
        date: new Date('2020-10-10 00:00:00'),
        time: TimeOfDay.AFTERNOON,
        rpe: 9,
      })
    );
  });

  it('should dispatch updateOneRepMax action', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.update({
      id: '0',
      exercise: Exercise.benchpress,
      weight: 110,
      reps: 2,
      oneRepMax: 122.5,
      calculated: true,
      date: new Date('2020-10-10 00:00:00'),
      time: TimeOfDay.AFTERNOON,
      rpe: 9,
    });

    expect(dispatch).toHaveBeenCalledWith(
      fromOneRepMaxActions.updateOneRepMax({
        id: '0',
        exercise: Exercise.benchpress,
        weight: 110,
        reps: 2,
        oneRepMax: 122.5,
        calculated: true,
        date: new Date('2020-10-10 00:00:00'),
        time: TimeOfDay.AFTERNOON,
        rpe: 9,
      })
    );
  });

  it('should dispatch deleteOneRepMax action', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.delete('0', Exercise.deadlift);

    expect(dispatch).toHaveBeenCalledWith(
      fromOneRepMaxActions.deleteOneRepMax({
        id: '0',
        exercise: Exercise.deadlift,
      })
    );
  });

  it('should dispatch startEditing action', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.startEditing();

    expect(dispatch).toHaveBeenCalledWith(fromOneRepMaxActions.startEditing());
  });

  it('should dispatch cancelEditing action', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.cancelEditing();

    expect(dispatch).toHaveBeenCalledWith(fromOneRepMaxActions.cancelEditing());
  });

  it('should dispatch startEditingExisting action', () => {
    const dispatch = spyOn(storeMock, 'dispatch');

    service.startEditingExisting({
      id: '3',
      exercise: Exercise.deadlift,
      weight: 150,
      reps: 5,
      oneRepMax: 197.5,
      calculated: true,
      date: new Date('2020-01-04 00:00:00'),
      time: TimeOfDay.MORNING,
      rpe: 10,
    });

    expect(dispatch).toHaveBeenCalledWith(
      fromOneRepMaxActions.startEditingExisting({
        oneRepMax: {
          id: '3',
          exercise: Exercise.deadlift,
          weight: 150,
          reps: 5,
          oneRepMax: 197.5,
          calculated: true,
          date: new Date('2020-01-04 00:00:00'),
          time: TimeOfDay.MORNING,
          rpe: 10,
        },
      })
    );
  });
});
