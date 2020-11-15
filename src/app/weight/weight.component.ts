import { Component, OnInit } from '@angular/core';
import { TimeOfDay } from './model/time-of-day.enum';
import { Weight } from './model/weight.model';
import { WeightService } from './services/weight.service';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {
  constructor(public readonly weightService: WeightService) { }

  ngOnInit(): void {
    this.weightService.fetchWeights();
  }
}
