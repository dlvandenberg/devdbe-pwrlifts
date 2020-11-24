import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from './model/exercise.enum';
import { OneRepMaxService } from './services/one-rep-max.service';

@Component({
  selector: 'app-one-rep-max',
  templateUrl: './one-rep-max.component.html',
  styleUrls: ['./one-rep-max.component.scss']
})
export class OneRepMaxComponent implements OnInit {
  public exercise: Exercise;

  constructor(
    private readonly route: ActivatedRoute,
    public readonly oneRepMaxService: OneRepMaxService
  ) { }

  ngOnInit(): void {
    this.exercise = Exercise[this.route.snapshot.params.exercise];
    this.route.params.subscribe(param => {
      this.exercise = Exercise[param.exercise];
      this.oneRepMaxService.fetchOneRepMaxes(this.exercise);
    });
  }

}
