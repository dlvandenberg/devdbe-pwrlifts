import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeasurementType } from './model/measurement-type.model';
import { BodyMeasurementService } from './services/body-measurement.service';

@Component({
  selector: 'app-body-measurement',
  templateUrl: './body-measurement.component.html'
})
export class BodyMeasurementComponent implements OnInit {
  public measurementType: MeasurementType;

  constructor(
    private readonly route: ActivatedRoute,
    public readonly bodyMeasurementService: BodyMeasurementService
  ) { }

  ngOnInit(): void {
    this.measurementType = MeasurementType.from(this.route.snapshot.params.type);
    this.route.params.subscribe(param => {
      this.measurementType = MeasurementType.from(param.type);
      this.bodyMeasurementService.fetchBodyMeasurements(this.measurementType);
    });
  }

}
