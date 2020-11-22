import { Component, OnInit } from '@angular/core';
import { TimeOfDay } from '../shared/model/time-of-day.enum';
import { Bodyfat } from './model/bodyfat.model';

@Component({
  selector: 'app-bodyfat',
  templateUrl: './bodyfat.component.html',
  styleUrls: ['./bodyfat.component.scss']
})
export class BodyfatComponent implements OnInit {

  public measurements: Bodyfat[] = [
    {
      id: '0',
      bodyfat: 13.8,
      measuredOn: new Date('10-10-2020'),
      partOfDayMeasured: TimeOfDay.AFTERNOON
    },
    {
      id: '1',
      bodyfat: 14.5,
      measuredOn: new Date('10-11-2020'),
      partOfDayMeasured: TimeOfDay.AFTERNOON
    },
    {
      id: '2',
      bodyfat: 14.0,
      measuredOn: new Date('10-18-2020'),
      partOfDayMeasured: TimeOfDay.MORNING
    },
    {
      id: '3',
      bodyfat: 15.2,
      measuredOn: new Date('11-10-2020'),
      partOfDayMeasured: TimeOfDay.AFTERNOON
    },
    {
      id: '4',
      bodyfat: 12,
      measuredOn: new Date('09-09-2020'),
      partOfDayMeasured: TimeOfDay.AFTERNOON
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
