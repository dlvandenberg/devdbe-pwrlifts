import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BodyMeasurement } from '@app-body-measurement/model/body-measurement.model';
import { MeasurementType } from '@app-body-measurement/model/measurement-type.model';
import { BodyMeasurementService } from '@app-body-measurement/services/body-measurement.service';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { EditBodyMeasurementComponent } from './edit-body-measurement.component';

describe('EditBodyMeasurementComponent', () => {
  let component: EditBodyMeasurementComponent;
  const bodyMeasurementServiceMock: Partial<BodyMeasurementService> = {
    measurements$(measurementType: MeasurementType): Observable<BodyMeasurement[]> {
      return of([]);
    },
    update(bodyMeasurement: BodyMeasurement): void {},
    create(bodyMeasurement: BodyMeasurement): void {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DatePipe,
        FormBuilder,
        { provide: BodyMeasurementService, useValue: bodyMeasurementServiceMock }
      ]
    });

    const datePipe = TestBed.inject(DatePipe);
    const formBuilder = TestBed.inject(FormBuilder);
    const bodyMeasurementService = TestBed.inject(BodyMeasurementService);
    component = new EditBodyMeasurementComponent(formBuilder, bodyMeasurementService, datePipe);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a default BodyMeasurement object when no value is set via input', () => {
    expect(component.measurement.id).toEqual(null);
    expect(component.measurement.measurement).toEqual(0);
    expect(component.measurement.measurementType).toEqual(null);
    expect(component.measurement.calories).toEqual(0);
    expect(component.measurement.date).toBeTruthy();
    expect(component.measurement.time).toEqual(TimeOfDay.MORNING);
  });

  it('should create a default BodyMeasurement object when a null value is set via input', () => {
    component.measurementType = MeasurementType.BODYFAT;
    component.measurement = null;
    expect(component.measurement.id).toEqual(null);
    expect(component.measurement.measurement).toEqual(0);
    expect(component.measurement.measurementType).toEqual(MeasurementType.BODYFAT);
    expect(component.measurement.calories).toEqual(0);
    expect(component.measurement.date).toBeTruthy();
    expect(component.measurement.time).toEqual(TimeOfDay.MORNING);
  });

  it('should correctly initialize the form when an BodyMeasurement object is set via input', () => {
    component.measurement = {
      id: '0',
      measurement: 13.5,
      calories: 4100,
      measurementType: MeasurementType.BODYFAT,
      date: new Date('2020-05-06'),
      time: TimeOfDay.EVENING
    };

    component.ngOnInit();

    const formValue = component.measurementForm.value;
    expect(formValue).toEqual({
      measurement: 13.5,
      calories: 4100,
      date: '2020-05-06',
      time: TimeOfDay.EVENING
    });
  });

  describe('form validation', () => {
    it('should invalidate form when measurement is empty', () => {
      component.ngOnInit();
      component.measurementForm.controls.measurement.patchValue(null);
      component.measurementForm.controls.measurement.markAsDirty();

      expect(component.measurementForm.invalid).toBeTrue();
      expect(component.measurementInvalid).toBeTrue();
    });

    it('should invalidate form when measurement is a negative value', () => {
      component.ngOnInit();
      component.measurementForm.controls.measurement.patchValue(-10);
      component.measurementForm.controls.measurement.markAsDirty();

      expect(component.measurementForm.invalid).toBeTrue();
      expect(component.measurementInvalid).toBeTrue();
    });

    it('should invalidate form when calories is empty', () => {
      component.ngOnInit();
      component.measurementForm.controls.calories.patchValue(null);
      component.measurementForm.controls.calories.markAsDirty();

      expect(component.measurementForm.invalid).toBeTrue();
      expect(component.caloriesInvalid).toBeTrue();
    });

    it('should invalidate form when calories is a negative value', () => {
      component.ngOnInit();
      component.measurementForm.controls.calories.patchValue(-10);
      component.measurementForm.controls.calories.markAsDirty();

      expect(component.measurementForm.invalid).toBeTrue();
      expect(component.caloriesInvalid).toBeTrue();
    });

    it('should invalidate form when date is empty', () => {
      component.ngOnInit();
      component.measurementForm.controls.date.patchValue(null);
      component.measurementForm.controls.date.markAsDirty();

      expect(component.measurementForm.invalid).toBeTrue();
      expect(component.dateInvalid).toBeTrue();
    });

    it('should invalidate form when date is an invalid date', () => {
      component.ngOnInit();
      component.measurementForm.controls.date.patchValue('2020-30-30');
      component.measurementForm.controls.date.markAsDirty();

      expect(component.measurementForm.invalid).toBeTrue();
      expect(component.dateInvalid).toBeTrue();
    });

    it('should not invalidate form when time is empty', () => {
      component.ngOnInit();
      component.measurementForm.controls.time.patchValue(null);
      component.measurementForm.controls.time.markAsDirty();

      expect(component.measurementForm.invalid).toBeFalse();
    });
  });

  it('should send an update request when the form is submitted with an existing measurement', () => {
    const spy = spyOn(bodyMeasurementServiceMock, 'update');
    component.measurement = {
      id: '0',
      measurement: 13.5,
      measurementType: MeasurementType.BODYFAT,
      calories: 3100,
      date: new Date('2020-05-06 00:00:00'),
      time: TimeOfDay.EVENING
    };
    component.measurementType = MeasurementType.BODYFAT;
    component.ngOnInit();

    component.measurementForm.controls.measurement.patchValue(14.8);

    component.saveBodyMeasurement();

    expect(spy).toHaveBeenCalledWith({
      id: '0',
      measurement: 14.8,
      measurementType: MeasurementType.BODYFAT,
      calories: 3100,
      date: moment('2020-05-06', 'YYYY-MM-DD').toDate(),
      time: TimeOfDay.EVENING
    });
  });

  it('should send an create request when the form is submitted with a new measurement', () => {
    const spy = spyOn(bodyMeasurementServiceMock, 'create');
    component.measurementType = MeasurementType.WEIGHT;
    component.ngOnInit();

    component.measurementForm.controls.measurement.patchValue(20);
    component.measurementForm.controls.date.patchValue(new Date('2020-01-01 00:00:00'));
    component.measurementForm.controls.time.patchValue(TimeOfDay.MORNING);
    component.measurementForm.controls.calories.patchValue(3100);

    component.saveBodyMeasurement();

    expect(spy).toHaveBeenCalledWith({
      measurement: 20,
      date: moment('2020-01-01', 'YYYY-MM-DD').toDate(),
      calories: 3100,
      time: TimeOfDay.MORNING,
      measurementType: MeasurementType.WEIGHT
    });
  });

  it('should return timeOfDay value when time() is called', () => {
    component.ngOnInit();

    expect(component.time).toEqual(TimeOfDay.MORNING);
  });
});
