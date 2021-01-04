import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BodyMeasurementComponent } from './body-measurement.component';
import { BodyMeasurementService } from './services/body-measurement.service';

describe('BodyMeasurementComponent', () => {
  let component: BodyMeasurementComponent;
  const bodyMeasurementServiceMock: Partial<BodyMeasurementService> = {
    fetchBodyMeasurements(): void {}
  };
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: BodyMeasurementService, useValue: bodyMeasurementServiceMock }
      ]
    });
    const bodyfatService = TestBed.inject(BodyMeasurementService);
    route = TestBed.inject(ActivatedRoute);
    component = new BodyMeasurementComponent(route, bodyfatService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch body measurements on initialization', () => {
    route.params = of({ type: 'weight' });
    route.snapshot.params = { type: 'weight' };
    const fetch = spyOn(bodyMeasurementServiceMock, 'fetchBodyMeasurements');

    component.ngOnInit();

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
