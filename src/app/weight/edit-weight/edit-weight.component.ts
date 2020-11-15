import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateValidator } from '@app-validators/date-validator.directive';
import { TimeOfDay } from '../model/time-of-day.enum';
import { Weight } from '../model/weight.model';
import { WeightService } from '../services/weight.service';

@Component({
  selector: 'app-edit-weight',
  templateUrl: './edit-weight.component.html',
  styleUrls: ['./edit-weight.component.scss'],
  providers: [DatePipe]
})
export class EditWeightComponent implements OnInit {

  public weightForm: FormGroup;
  public timeOfDayEnum = TimeOfDay;

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
      weight: this.formBuilder.control('', [Validators.required, Validators.min(0)]),
      calories: this.formBuilder.control('', [Validators.required, Validators.min(0)]),
      measuredOn: this.formBuilder.control(this.datePipe.transform(new Date(), 'yyyy-MM-dd'), [
        Validators.required, dateValidator
      ]),
      partOfDayMeasured: this.formBuilder.control(TimeOfDay.MORNING, Validators.required)
    });
  }

  get partOfDayMeasured(): TimeOfDay {
    return this.weightForm.controls.partOfDayMeasured.value;
  }

  get weightInvalid(): boolean {
    return !this.weightForm.controls.weight.valid && this.weightForm.controls.weight.dirty;
  }

  get caloriesInvalid(): boolean {
    return !this.weightForm.controls.calories.valid && this.weightForm.controls.calories.dirty;
  }

  get measuredOnInvalid(): boolean {
    return !this.weightForm.controls.measuredOn.valid && this.weightForm.controls.measuredOn.dirty;
  }


}
