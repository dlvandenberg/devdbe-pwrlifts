import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { BodyMeasurementComponent } from './body-measurement.component';
import { BodyMeasurementService } from './services/bodyfat.service';

describe('BodyfatComponent', () => {
  let component: BodyMeasurementComponent;
  const bodyMeasurementServiceMock: Partial<BodyMeasurementService> = {
    fetchBodyMeasurements(): void {}
  };
  const routeMock: Partial<ActivatedRoute> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: BodyMeasurementService, useValue: bodyMeasurementServiceMock },
        { provide: ActivatedRoute, useValue: routeMock }
      ]
    });
    const bodyfatService = TestBed.inject(BodyMeasurementService);
    const route = TestBed.inject(ActivatedRoute);
    component = new BodyMeasurementComponent(route, bodyfatService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch bodyfats on initialization', () => {
    const fetch = spyOn(bodyMeasurementServiceMock, 'fetchBodyMeasurements');

    component.ngOnInit();

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
