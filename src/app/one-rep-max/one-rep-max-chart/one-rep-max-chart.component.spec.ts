import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRepMaxChartComponent } from './one-rep-max-chart.component';

describe('OneRepMaxChartComponent', () => {
  let component: OneRepMaxChartComponent;
  let fixture: ComponentFixture<OneRepMaxChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneRepMaxChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneRepMaxChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
