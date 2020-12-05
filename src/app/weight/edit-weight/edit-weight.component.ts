import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateValidator } from '@app-validators/date-validator.directive';
import * as moment from 'moment';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { Weight } from '@app-weight/model/weight.model';
import { WeightService } from '@app-weight/services/weight.service';

@Component({
  selector: 'app-edit-weight',
  templateUrl: './edit-weight.component.html',
  providers: [DatePipe]
})
export class EditWeightComponent implements OnInit {

  public weightForm: FormGroup;
  public timeOfDayEnum = TimeOfDay;
  private editingWeight: Weight;

  @Input()
  set weight(newWeight: Weight) {
    if (newWeight === null) {
      this.editingWeight = {
        id: null,
        weight: 0,
        calories: 0,
        date: new Date(),
        time: TimeOfDay.MORNING
      };
    } else {
      this.editingWeight = newWeight;
    }
  }

  get weight(): Weight {
    return this.editingWeight;
  }

  @Output()
  public cancel = new EventEmitter<null>();

  @Output()
  public save = new EventEmitter<Weight>();

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly weightService: WeightService,
    private readonly datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.weightForm = this.formBuilder.group({
      weight: this.formBuilder.control(this.weight.weight, [Validators.required, Validators.min(0)]),
      calories: this.formBuilder.control(this.weight.calories, [Validators.required, Validators.min(0)]),
      date: this.formBuilder.control(this.datePipe.transform(this.weight.date, 'yyyy-MM-dd'), [
        Validators.required, dateValidator
      ]),
      time: this.formBuilder.control(this.weight.time, Validators.required)
    });
  }

  public saveWeight(): void {
    if (this.weight.id) {
      this.weightService.update({
        id: this.weight.id,
        ...this.weightForm.value,
        date: moment(this.weightForm.value.date, 'YYYY-MM-DD').toDate()
      });
    } else {
      this.weightService.create({
        ...this.weightForm.value,
        date: moment(this.weightForm.value.date, 'YYYY-MM-DD').toDate()
      });
    }
  }

  get time(): TimeOfDay {
    return this.weightForm.controls.time.value;
  }

  get weightInvalid(): boolean {
    return !this.weightForm.controls.weight.valid && this.weightForm.controls.weight.dirty;
  }

  get caloriesInvalid(): boolean {
    return !this.weightForm.controls.calories.valid && this.weightForm.controls.calories.dirty;
  }

  get dateInvalid(): boolean {
    return !this.weightForm.controls.date.valid && this.weightForm.controls.date.dirty;
  }


}
