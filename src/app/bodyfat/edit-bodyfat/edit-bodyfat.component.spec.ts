import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Bodyfat } from '@app-bodyfat/model/bodyfat.model';
import { BodyfatService } from '@app-bodyfat/services/bodyfat.service';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { EditBodyfatComponent } from './edit-bodyfat.component';

describe('EditComponent', () => {
  let component: EditBodyfatComponent;
  const bodyfatServiceMock: Partial<BodyfatService> = {
    get bodyfats$(): Observable<Bodyfat[]> {
      return of([]);
    },
    update(bodyfat: Bodyfat): void {},
    create(bodyfat: Bodyfat): void {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DatePipe,
        FormBuilder,
        { provide: BodyfatService, useValue: bodyfatServiceMock }
      ]
    });

    const datePipe = TestBed.inject(DatePipe);
    const formBuilder = TestBed.inject(FormBuilder);
    const bodyfatService = TestBed.inject(BodyfatService);
    component = new EditBodyfatComponent(formBuilder, bodyfatService, datePipe);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a default Bodyfat object when no value is set via input', () => {
    expect(component.bodyfat.id).toEqual(null);
    expect(component.bodyfat.bodyfat).toEqual(0);
    expect(component.bodyfat.date).toBeTruthy();
    expect(component.bodyfat.time).toEqual(TimeOfDay.MORNING);
  });

  it('should create a default Bodyfat object when a null value is set via input', () => {
    component.bodyfat = null;
    expect(component.bodyfat.id).toEqual(null);
    expect(component.bodyfat.bodyfat).toEqual(0);
    expect(component.bodyfat.date).toBeTruthy();
    expect(component.bodyfat.time).toEqual(TimeOfDay.MORNING);
  });

  it('should correctly initialize the form when an Bodyfat object is set via input', () => {
    component.bodyfat = {
      id: '0',
      bodyfat: 13.5,
      date: new Date('2020-05-06'),
      time: TimeOfDay.EVENING
    };

    component.ngOnInit();

    const formValue = component.bodyfatForm.value;
    expect(formValue).toEqual({
      bodyfat: 13.5,
      date: '2020-05-06',
      time: TimeOfDay.EVENING
    });
  });

  describe('form validation', () => {
    it('should invalidate form when bodyfat is empty', () => {
      component.ngOnInit();
      component.bodyfatForm.controls.bodyfat.patchValue(null);
      component.bodyfatForm.controls.bodyfat.markAsDirty();

      expect(component.bodyfatForm.invalid).toBeTrue();
      expect(component.bodyfatInvalid).toBeTrue();
    });

    it('should invalidate form when bodyfat is a negative value', () => {
      component.ngOnInit();
      component.bodyfatForm.controls.bodyfat.patchValue(-10);
      component.bodyfatForm.controls.bodyfat.markAsDirty();

      expect(component.bodyfatForm.invalid).toBeTrue();
      expect(component.bodyfatInvalid).toBeTrue();
    });

    it('should invalidate form when date is empty', () => {
      component.ngOnInit();
      component.bodyfatForm.controls.date.patchValue(null);
      component.bodyfatForm.controls.date.markAsDirty();

      expect(component.bodyfatForm.invalid).toBeTrue();
      expect(component.dateInvalid).toBeTrue();
    });

    it('should invalidate form when date is an invalid date', () => {
      component.ngOnInit();
      component.bodyfatForm.controls.date.patchValue('2020-30-30');
      component.bodyfatForm.controls.date.markAsDirty();

      expect(component.bodyfatForm.invalid).toBeTrue();
      expect(component.dateInvalid).toBeTrue();
    });

    it('should not invalidate form when time is empty', () => {
      component.ngOnInit();
      component.bodyfatForm.controls.time.patchValue(null);
      component.bodyfatForm.controls.time.markAsDirty();

      expect(component.bodyfatForm.invalid).toBeFalse();
    });
  });

  it('should send an update request when the form is submitted with an existing bodyfat', () => {
    const spy = spyOn(bodyfatServiceMock, 'update');
    component.bodyfat = {
      id: '0',
      bodyfat: 13.5,
      date: new Date('2020-05-06 00:00:00'),
      time: TimeOfDay.EVENING
    };
    component.ngOnInit();

    component.bodyfatForm.controls.bodyfat.patchValue(14.8);

    component.saveBodyfat();

    expect(spy).toHaveBeenCalledWith({
      id: '0',
      bodyfat: 14.8,
      date: moment('2020-05-06', 'YYYY-MM-DD').toDate(),
      time: TimeOfDay.EVENING
    });
  });

  it('should send an create request when the form is submitted with a new bodyfat', () => {
    const spy = spyOn(bodyfatServiceMock, 'create');
    component.ngOnInit();

    component.bodyfatForm.controls.bodyfat.patchValue(20);
    component.bodyfatForm.controls.date.patchValue(new Date('2020-01-01 00:00:00'));
    component.bodyfatForm.controls.time.patchValue(TimeOfDay.MORNING);

    component.saveBodyfat();

    const obj = { bodyfat: 20,
      date: moment('2020-01-01', 'YYYY-MM-DD').toDate(),
      time: TimeOfDay.MORNING };

    expect(spy).toHaveBeenCalledWith({
      bodyfat: 20,
      date: moment('2020-01-01', 'YYYY-MM-DD').toDate(),
      time: TimeOfDay.MORNING
    });
  });

  it('should return timeOfDay value when time() is called', () => {
    component.ngOnInit();

    expect(component.time).toEqual(TimeOfDay.MORNING);
  })
});
