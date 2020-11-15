import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TimeOfDay } from '../model/time-of-day.enum';
import { Weight } from '../model/weight.model';
import { WeightService } from '../services/weight.service';

@Component({
  selector: 'app-edit-weight',
  templateUrl: './edit-weight.component.html',
  styleUrls: ['./edit-weight.component.scss']
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
    public readonly weightService: WeightService
  ) { }

  ngOnInit(): void {
    this.weightForm = this.formBuilder.group({
      weight: this.formBuilder.control(88),
      calories: this.formBuilder.control(3100),
      measuredOn: this.formBuilder.control(new Date()),
      partOfDayMeasured: this.formBuilder.control(TimeOfDay.MORNING)
    });
  }

  get partOfDayMeasured(): TimeOfDay {
    return this.weightForm.controls.partOfDayMeasured.value;
  }
}
