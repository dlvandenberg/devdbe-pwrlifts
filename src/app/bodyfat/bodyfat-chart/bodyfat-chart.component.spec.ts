import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyfatChartComponent } from './bodyfat-chart.component';

describe('BodyfatChartComponent', () => {
  let component: BodyfatChartComponent;
  let fixture: ComponentFixture<BodyfatChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyfatChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyfatChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
