import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeightService } from './services/weight.service';

import { WeightComponent } from './weight.component';

describe('WeightComponent', () => {
  let component: WeightComponent;
  const weightServiceMock: Partial<WeightService> = {
    fetchWeights(): void {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ { provide: WeightService, useValue: weightServiceMock }]
    })
    .compileComponents();

    const weightService = TestBed.inject(WeightService);
    component = new WeightComponent(weightService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
