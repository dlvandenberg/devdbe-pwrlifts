import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodyMeasurement } from '@app-body-measurement/model/bodyfat.model';
import { BodyMeasurementService } from '@app-body-measurement/services/bodyfat.service';
import { dateValidator } from '@app-validators/date-validator.directive';
import * as moment from 'moment';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { MeasurementType } from '@app-body-measurement/model/measurement-type.model';

@Component({
  selector: 'app-edit-body-measurement',
  templateUrl: './edit-body-measurement.component.html',
  providers: [DatePipe]
})
export class EditBodyMeasurementComponent implements OnInit {

  public measurementForm: FormGroup;
  public timeOfDayEnum = TimeOfDay;
  private editingMeasurement: BodyMeasurement = {
        id: null,
        measurementType: null,
        measurement: 0,
        calories: 0,
        date: new Date(),
        time: TimeOfDay.MORNING
  };

  @Input()
  set measurement(newMeasurement: BodyMeasurement) {
    if (newMeasurement === null) {
      this.editingMeasurement = {
        id: null,
        measurementType: this.measurementType,
        measurement: 0,
        calories: 0,
        date: new Date(),
        time: TimeOfDay.MORNING
      };
    } else {
      this.editingMeasurement = newMeasurement;
    }
  }

  get measurement(): BodyMeasurement {
    return this.editingMeasurement;
  }

  @Input()
  public measurementType: MeasurementType;

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly bodyMeasurementService: BodyMeasurementService,
    private readonly datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    if (!this.editingMeasurement.measurementType) {
      this.editingMeasurement.measurementType = this.measurementType;
    }
    this.measurementForm = this.formBuilder.group({
      measurement: this.formBuilder.control(this.measurement.measurement, [Validators.required, Validators.min(0)]),
      calories: this.formBuilder.control(this.measurement.calories, [Validators.required, Validators.min(0)]),
      date: this.formBuilder.control(this.datePipe.transform(this.measurement.date, 'yyyy-MM-dd'), [
        Validators.required, dateValidator()
      ]),
      time: this.formBuilder.control(this.measurement.time)
    });
  }

  public saveBodyMeasurement(): void {
    if (this.measurement.id) {
      this.bodyMeasurementService.update({
        ...this.measurementForm.value,
        id: this.measurement.id,
        measurementType: this.measurementType,
        date: moment(this.measurementForm.value.date, 'YYYY-MM-DD').toDate()
      });
    } else {
      this.bodyMeasurementService.create({
        ...this.measurementForm.value,
        measurementType: this.measurementType,
        date: moment(this.measurementForm.value.date, 'YYYY-MM-DD').toDate()
      });
    }
  }

  get time(): TimeOfDay {
    return this.measurementForm.controls.time.value;
  }

  get caloriesInvalid(): boolean {
    return !this.measurementForm.controls.calories.valid && this.measurementForm.controls.calories.dirty;
  }

  get measurementInvalid(): boolean {
    return !this.measurementForm.controls.measurement.valid && this.measurementForm.controls.measurement.dirty;
  }

  get dateInvalid(): boolean {
    return !this.measurementForm.controls.date.valid && this.measurementForm.controls.date.dirty;
  }

  get measurementText(): string {
    return this.measurementType.name + ' in ' + this.measurementType.unit;
  }
}
