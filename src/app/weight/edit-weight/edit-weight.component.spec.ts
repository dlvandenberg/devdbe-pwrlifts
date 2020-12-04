import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { WeightService } from '@app-weight/services/weight.service';

import { EditWeightComponent } from './edit-weight.component';

describe('EditComponent', () => {
  let component: EditWeightComponent;
  const weightServiceMock: Partial<WeightService> = {

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DatePipe,
        FormBuilder,
        { provide: WeightService, useValue: weightServiceMock }
      ]
    })
    .compileComponents();

    const datePipe = TestBed.inject(DatePipe);
    const formBuilder = TestBed.inject(FormBuilder);
    const weightService = TestBed.inject(WeightService);
    component = new EditWeightComponent(formBuilder, weightService, datePipe);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
