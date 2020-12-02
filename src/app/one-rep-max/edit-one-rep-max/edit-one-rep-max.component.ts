import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateValidator } from '@app-validators/date-validator.directive';
import * as moment from 'moment';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { Exercise } from '@app-one-rep-max/model/exercise.enum';
import { OneRepMax } from '@app-one-rep-max/model/one-rep-max.model';
import { OneRepMaxService } from '@app-one-rep-max/services/one-rep-max.service';

@Component({
  selector: 'app-edit-one-rep-max',
  templateUrl: './edit-one-rep-max.component.html',
  providers: [DatePipe],
})
export class EditOneRepMaxComponent implements OnInit {
  public oneRepMaxForm: FormGroup;
  public timeOfDayEnum = TimeOfDay;
  private editingOneRepMax: OneRepMax = {
    id: null,
    exercise: null,
    weight: 0,
    reps: 0,
    calculated: false,
    oneRepMax: undefined,
    date: new Date(),
    time: TimeOfDay.EVENING,
    rpe: undefined,
  };

  @Input()
  set oneRepMax(newOneRepMax: OneRepMax) {
    if (newOneRepMax === null) {
      this.editingOneRepMax = {
        id: null,
        exercise: this.exercise,
        weight: 0,
        reps: 0,
        calculated: false,
        oneRepMax: 0,
        date: new Date(),
        time: TimeOfDay.EVENING,
        rpe: 0,
      };
    } else {
      this.editingOneRepMax = newOneRepMax;
    }
  }

  get oneRepMax(): OneRepMax {
    return this.editingOneRepMax;
  }

  @Input()
  public exercise: Exercise;

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly oneRepMaxService: OneRepMaxService,
    private readonly datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    if (this.editingOneRepMax.exercise === null) {
      this.editingOneRepMax.exercise = this.exercise;
    }

    this.oneRepMaxForm = this.formBuilder.group({
      weight: this.formBuilder.control(this.oneRepMax.weight, [
        Validators.required,
        Validators.min(1),
      ]),
      reps: this.formBuilder.control(this.oneRepMax.reps, [
        Validators.required,
        Validators.min(1),
        Validators.max(15),
      ]),
      date: this.formBuilder.control(
        this.datePipe.transform(this.oneRepMax.date, 'yyyy-MM-dd'),
        [Validators.required, dateValidator()]
      ),
      time: this.formBuilder.control(this.oneRepMax.time),
      rpe: this.formBuilder.control(this.oneRepMax.rpe, [
        Validators.min(0),
        Validators.max(10),
        Validators.pattern('[0-9]{1,2}'),
      ]),
    });
  }

  public saveOneRepMax(): void {
    let oneRepMax = 0;
    let calculated = false;
    const weight = this.oneRepMaxForm.value.weight;
    const reps = this.oneRepMaxForm.value.reps;
    if (reps > 1) {
      // Calculate 1RM
      calculated = true;
      // Brzycki formula
      oneRepMax = weight * (36 / (37 - reps));
    } else {
      oneRepMax = weight;
    }
    if (this.oneRepMax.id) {
      this.oneRepMaxService.update({
        ...this.oneRepMaxForm.value,
        id: this.oneRepMax.id,
        exercise: this.exercise,
        calculated,
        oneRepMax,
        date: moment(this.oneRepMaxForm.value.date, 'YYYY-MM-DD').toDate(),
      });
    } else {
      this.oneRepMaxService.create({
        ...this.oneRepMaxForm.value,
        exercise: this.exercise,
        calculated,
        oneRepMax,
        date: moment(this.oneRepMaxForm.value.date, 'YYYY-MM-DD').toDate(),
      });
    }
  }

  get time(): TimeOfDay {
    return this.oneRepMaxForm.controls.time.value;
  }

  get weightInvalid(): boolean {
    return (
      !this.oneRepMaxForm.controls.weight.valid &&
      this.oneRepMaxForm.controls.weight.dirty
    );
  }

  get repsInvalid(): boolean {
    return (
      !this.oneRepMaxForm.controls.reps.valid &&
      this.oneRepMaxForm.controls.reps.dirty
    );
  }

  get dateInvalid(): boolean {
    return (
      !this.oneRepMaxForm.controls.date.valid &&
      this.oneRepMaxForm.controls.date.dirty
    );
  }

  get rpeInvalid(): boolean {
    return (
      !this.oneRepMaxForm.controls.rpe.valid &&
      this.oneRepMaxForm.controls.rpe.dirty
    );
  }
}
