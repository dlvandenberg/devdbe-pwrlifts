import { Component, OnInit } from '@angular/core';
import { WeightService } from './services/weight.service';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html'
})
export class WeightComponent implements OnInit {
  constructor(public readonly weightService: WeightService) { }

  ngOnInit(): void {
    this.weightService.fetchWeights();
  }
}
