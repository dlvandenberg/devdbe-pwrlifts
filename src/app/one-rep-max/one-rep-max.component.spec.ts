import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { OneRepMaxComponent } from './one-rep-max.component';
import { OneRepMaxService } from './services/one-rep-max.service';

describe('OneRepMaxComponent', () => {
  let component: OneRepMaxComponent;
  const oneRepMaxServiceMock: Partial<OneRepMaxService> = {};
  const routeMock: Partial<ActivatedRoute> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: OneRepMaxService, useValue: oneRepMaxServiceMock }
      ]
    })
    .compileComponents();

    const oneRepMaxService = TestBed.inject(OneRepMaxService);
    const route = TestBed.inject(ActivatedRoute);
    component = new OneRepMaxComponent(route, oneRepMaxService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
