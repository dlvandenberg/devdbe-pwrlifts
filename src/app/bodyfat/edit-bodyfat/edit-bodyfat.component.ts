import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bodyfat } from '@app-bodyfat/model/bodyfat.model';
import { BodyfatService } from '@app-bodyfat/services/bodyfat.service';
import { dateValidator } from '@app-validators/date-validator.directive';
import * as moment from 'moment';
import { TimeOfDay } from '../../shared/model/time-of-day.enum';

@Component({
  selector: 'app-edit-bodyfat',
  templateUrl: './edit-bodyfat.component.html',
  providers: [DatePipe]
})
export class EditBodyfatComponent implements OnInit {

  public bodyfatForm: FormGroup;
  public timeOfDayEnum = TimeOfDay;
  private editingbodyfat: Bodyfat = {
    id: null,
        bodyfat: 0,
        measuredOn: new Date(),
        partOfDayMeasured: TimeOfDay.MORNING
  };

  @Input()
  set bodyfat(newbodyfat: Bodyfat) {
    if (newbodyfat === null) {
      this.editingbodyfat = {
        id: null,
        bodyfat: 0,
        measuredOn: new Date(),
        partOfDayMeasured: TimeOfDay.MORNING
      };
    } else {
      this.editingbodyfat = newbodyfat;
    }
  }

  get bodyfat(): Bodyfat {
    return this.editingbodyfat;
  }

  @Output()
  public cancel = new EventEmitter<null>();

  @Output()
  public save = new EventEmitter<Bodyfat>();

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly bodyfatService: BodyfatService,
    private readonly datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.bodyfatForm = this.formBuilder.group({
      bodyfat: this.formBuilder.control(this.bodyfat.bodyfat, [Validators.required, Validators.min(0)]),
      measuredOn: this.formBuilder.control(this.datePipe.transform(this.bodyfat.measuredOn, 'yyyy-MM-dd'), [
        Validators.required, dateValidator
      ]),
      partOfDayMeasured: this.formBuilder.control(this.bodyfat.partOfDayMeasured, Validators.required)
    });
  }

  public saveBodyfat(): void {
    if (this.bodyfat.id) {
      this.bodyfatService.update({
        id: this.bodyfat.id,
        ...this.bodyfatForm.value,
        measuredOn: moment(this.bodyfatForm.value.measuredOn, 'YYYY-MM-DD').toDate()
      });
    } else {
      this.bodyfatService.create({
        ...this.bodyfatForm.value,
        measuredOn: moment(this.bodyfatForm.value.measuredOn, 'YYYY-MM-DD').toDate()
      });
    }
  }

  get partOfDayMeasured(): TimeOfDay {
    return this.bodyfatForm.controls.partOfDayMeasured.value;
  }

  get bodyfatInvalid(): boolean {
    return !this.bodyfatForm.controls.bodyfat.valid && this.bodyfatForm.controls.bodyfat.dirty;
  }

  get measuredOnInvalid(): boolean {
    return !this.bodyfatForm.controls.measuredOn.valid && this.bodyfatForm.controls.measuredOn.dirty;
  }
}
