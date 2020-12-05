import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestroyObservable } from '@app-shared/destroy.observable';
import { WeightService } from '@app-weight/services/weight.service';

import { WeightChartComponent } from './weight-chart.component';

describe('WeightChartComponent', () => {
  let component: WeightChartComponent;
  const weightServiceMock: Partial<WeightService> = { };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DatePipe,
        DestroyObservable,
        { provide: WeightService, useValue: weightServiceMock }
      ]
    })
    .compileComponents();

    const datePipe = TestBed.inject(DatePipe);
    const destroy$ =  TestBed.inject(DestroyObservable);
    const weightService = TestBed.inject(WeightService);
    component = new WeightChartComponent(destroy$, weightService, datePipe);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
