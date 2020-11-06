import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {

  public weights = [
    {
      weight: 88,
      dateMeasured: new Date('2020-10-10')
    },
    {
      weight: 88.5,
      dateMeasured: new Date('2020-10-11')
    },
    {
      weight: 92,
      dateMeasured: new Date('2020-10-12')
    },
    {
      weight: 89.5,
      dateMeasured: new Date('2020-10-13')
    },
    {
      weight: 88,
      dateMeasured: new Date('2020-10-14')
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
