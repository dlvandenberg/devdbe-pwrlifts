import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Exercise } from '@app-one-rep-max/model/exercise.enum';
import { OneRepMax } from '@app-one-rep-max/model/one-rep-max.model';
import { OneRepMaxService } from '@app-one-rep-max/services/one-rep-max.service';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { Observable, of } from 'rxjs';

import { EditOneRepMaxComponent } from './edit-one-rep-max.component';

describe('EditOneRepMaxComponent', () => {
  let component: EditOneRepMaxComponent;
  const oneRepMaxServiceMock: Partial<OneRepMaxService> = {
    oneRepMaxes$(): Observable<OneRepMax[]> {
      return of([]);
    },
    update(): void {},
    create(): void {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DatePipe,
        FormBuilder,
        { provide: OneRepMaxService, useValue: oneRepMaxServiceMock }
      ]
    });

    const datePipe = TestBed.inject(DatePipe);
    const formBuilder = TestBed.inject(FormBuilder);
    const oneRepMaxService = TestBed.inject(OneRepMaxService);
    component = new EditOneRepMaxComponent(formBuilder, oneRepMaxService, datePipe);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a default oneRepMax object when no value is set via input', () => {
    expect(component.oneRepMax.id).toBeNull();
    expect(component.oneRepMax.exercise).toBeNull();
    expect(component.oneRepMax.weight).toEqual(0);
    expect(component.oneRepMax.reps).toEqual(0);
    expect(component.oneRepMax.calculated).toBeFalse();
    expect(component.oneRepMax.date).toBeTruthy();
    expect(component.oneRepMax.time).toEqual(TimeOfDay.EVENING);
    expect(component.oneRepMax.rpe).toBeUndefined();
    expect(component.oneRepMax.oneRepMax).toBeUndefined();
  });

  it('should create a default oneRepMax object when a null value is set via input', () => {
    component.oneRepMax = null;
    expect(component.oneRepMax.id).toBeNull();
    expect(component.oneRepMax.exercise).toBeFalsy();
    expect(component.oneRepMax.weight).toEqual(0);
    expect(component.oneRepMax.reps).toEqual(0);
    expect(component.oneRepMax.calculated).toBeFalse();
    expect(component.oneRepMax.date).toBeTruthy();
    expect(component.oneRepMax.time).toEqual(TimeOfDay.EVENING);
    expect(component.oneRepMax.rpe).toEqual(0);
    expect(component.oneRepMax.oneRepMax).toEqual(0);
  });

  it('should correctly initialize the form', () => {
    component.oneRepMax = {
      id: '0',
      weight: 130,
      reps: 5,
      oneRepMax: 150,
      calculated: true,
      date: new Date('2020-12-02 00:00:00'),
      time: TimeOfDay.AFTERNOON,
      exercise: null,
      rpe: 9
    };
    component.exercise = Exercise.squat;

    component.ngOnInit();

    const formValue = component.oneRepMaxForm.value;

    expect(formValue.weight).toEqual(130);
    expect(formValue.reps).toEqual(5);
    expect(formValue.date).toEqual('2020-12-02');
    expect(formValue.time).toEqual(TimeOfDay.AFTERNOON);
    expect(formValue.rpe).toEqual(9);
  });

  describe('form validation', () => {
    beforeEach(() => {
      component.exercise = Exercise.squat;
      component.ngOnInit();
    });

    it('should invalidate the form when weight is empty', () => {
      component.oneRepMaxForm.controls.weight.patchValue(null);
      component.oneRepMaxForm.controls.weight.markAsDirty();

      expect(component.oneRepMaxForm.valid).toBeFalse();
      expect(component.weightInvalid).toBeTrue();
    });

    it('should invalidate the form when weight is less than 1', () => {
      component.oneRepMaxForm.controls.weight.patchValue(0);
      component.oneRepMaxForm.controls.weight.markAsDirty();

      expect(component.oneRepMaxForm.valid).toBeFalse();
      expect(component.weightInvalid).toBeTrue();
    });

    it('should invalidate the form when reps is empty', () => {
      component.oneRepMaxForm.controls.reps.patchValue(null);
      component.oneRepMaxForm.controls.reps.markAsDirty();

      expect(component.oneRepMaxForm.valid).toBeFalse();
      expect(component.repsInvalid).toBeTrue();
    });

    it('should invalidate the form when reps is less than 1', () => {
      component.oneRepMaxForm.controls.reps.patchValue(0);
      component.oneRepMaxForm.controls.reps.markAsDirty();

      expect(component.oneRepMaxForm.valid).toBeFalse();
      expect(component.repsInvalid).toBeTrue();
    });

    it('should invalidate the form when reps is higher than 15', () => {
      component.oneRepMaxForm.controls.reps.patchValue(16);
      component.oneRepMaxForm.controls.reps.markAsDirty();

      expect(component.oneRepMaxForm.valid).toBeFalse();
      expect(component.repsInvalid).toBeTrue();
    });

    it('should invalidate the form when date is empty', () => {
      component.oneRepMaxForm.controls.date.patchValue(null);
      component.oneRepMaxForm.controls.date.markAsDirty();

      expect(component.oneRepMaxForm.valid).toBeFalse();
      expect(component.dateInvalid).toBeTrue();
    });

    it('should invalidate the form when date is invalid', () => {
      component.oneRepMaxForm.controls.date.patchValue(new Date('2020-30-30'));
      component.oneRepMaxForm.controls.date.markAsDirty();

      expect(component.oneRepMaxForm.valid).toBeFalse();
      expect(component.dateInvalid).toBeTrue();
    });

    it('should invalidate the form when rpe is less than 0', () => {
      component.oneRepMaxForm.controls.rpe.patchValue(-1);
      component.oneRepMaxForm.controls.rpe.markAsDirty();

      expect(component.oneRepMaxForm.valid).toBeFalse();
      expect(component.rpeInvalid).toBeTrue();
    });

    it('should invalidate the form when rpe is higher than 10', () => {
      component.oneRepMaxForm.controls.rpe.patchValue(11);
      component.oneRepMaxForm.controls.rpe.markAsDirty();

      expect(component.oneRepMaxForm.valid).toBeFalse();
      expect(component.rpeInvalid).toBeTrue();
    });
  });

  it('should send an update request when the form is submitted with an existing oneRepMax entry', () => {
    const update = spyOn(oneRepMaxServiceMock, 'update');
    component.oneRepMax = {
      id: '0',
      weight: 130,
      reps: 1,
      oneRepMax: 130,
      calculated: false,
      date: new Date('2020-12-02 00:00:00'),
      time: TimeOfDay.AFTERNOON,
      exercise: null,
      rpe: 9
    };
    component.exercise = Exercise.squat;

    component.ngOnInit();

    component.oneRepMaxForm.controls.time.patchValue(TimeOfDay.EVENING);

    component.saveOneRepMax();
    expect(update).toHaveBeenCalledWith({
      id: '0',
      exercise: Exercise.squat,
      weight: 130,
      reps: 1,
      oneRepMax: 130,
      calculated: false,
      date: new Date('2020-12-02 00:00:00'),
      time: TimeOfDay.EVENING,
      rpe: 9
    });
  });

  it('should send an create request with a calculated 1RM when the form is submitted with an new oneRepMax entry with reps > 1', () => {
    const create = spyOn(oneRepMaxServiceMock, 'create');
    component.exercise = Exercise.deadlift;

    component.ngOnInit();

    component.oneRepMaxForm.controls.weight.patchValue(140);
    component.oneRepMaxForm.controls.reps.patchValue(5);
    component.oneRepMaxForm.controls.date.patchValue(new Date('2020-12-01 00:00:00'));

    component.saveOneRepMax();
    expect(create).toHaveBeenCalledWith({
      exercise: Exercise.deadlift,
      weight: 140,
      reps: 5,
      oneRepMax: 157.5,
      calculated: true,
      date: new Date('2020-12-01 00:00:00'),
      time: TimeOfDay.EVENING,
      rpe: null
    });
  });

  it('should return the current time value when time() is called', () => {
    component.ngOnInit();

    expect(component.time).toEqual(TimeOfDay.EVENING);
  });
});
