import { Component, OnInit } from '@angular/core';
import { BodyfatService } from './services/bodyfat.service';

@Component({
  selector: 'app-bodyfat',
  templateUrl: './bodyfat.component.html'
})
export class BodyfatComponent implements OnInit {

  constructor(public readonly bodyfatService: BodyfatService) { }

  ngOnInit(): void {
    this.bodyfatService.fetchBodyfats();
  }

}
