import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bodyfat } from '@app-bodyfat/model/bodyfat.model';
import { BodyfatService } from '@app-bodyfat/services/bodyfat.service';
import { dateValidator } from '@app-validators/date-validator.directive';
import * as moment from 'moment';
import { TimeOfDay } from '@app-types/time-of-day.enum';

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
        date: new Date(),
        time: TimeOfDay.MORNING
  };

  @Input()
  set bodyfat(newbodyfat: Bodyfat) {
    if (newbodyfat === null) {
      this.editingbodyfat = {
        id: null,
        bodyfat: 0,
        date: new Date(),
        time: TimeOfDay.MORNING
      };
    } else {
      this.editingbodyfat = newbodyfat;
    }
  }

  get bodyfat(): Bodyfat {
    return this.editingbodyfat;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly bodyfatService: BodyfatService,
    private readonly datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.bodyfatForm = this.formBuilder.group({
      bodyfat: this.formBuilder.control(this.bodyfat.bodyfat, [Validators.required, Validators.min(0)]),
      date: this.formBuilder.control(this.datePipe.transform(this.bodyfat.date, 'yyyy-MM-dd'), [
        Validators.required, dateValidator()
      ]),
      time: this.formBuilder.control(this.bodyfat.time)
    });
  }

  public saveBodyfat(): void {
    if (this.bodyfat.id) {
      this.bodyfatService.update({
        id: this.bodyfat.id,
        ...this.bodyfatForm.value,
        date: moment(this.bodyfatForm.value.date, 'YYYY-MM-DD').toDate()
      });
    } else {
      this.bodyfatService.create({
        ...this.bodyfatForm.value,
        date: moment(this.bodyfatForm.value.date, 'YYYY-MM-DD').toDate()
      });
    }
  }

  get time(): TimeOfDay {
    return this.bodyfatForm.controls.time.value;
  }

  get bodyfatInvalid(): boolean {
    return !this.bodyfatForm.controls.bodyfat.valid && this.bodyfatForm.controls.bodyfat.dirty;
  }

  get dateInvalid(): boolean {
    return !this.bodyfatForm.controls.date.valid && this.bodyfatForm.controls.date.dirty;
  }
}
