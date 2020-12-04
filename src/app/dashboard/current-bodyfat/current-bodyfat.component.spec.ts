import { TestBed } from '@angular/core/testing';
import { DashboardService } from '@app-dashboard/services/dashboard.service';
import { Observable, of } from 'rxjs';

import { CurrentBodyfatComponent } from './current-bodyfat.component';

describe('CurrentBodyfatComponent', () => {
  let component: CurrentBodyfatComponent;
  const dashboardServiceMock: Partial<DashboardService> = {
    fetchCurrentWeight(): void {},
    get currentWeight$(): Observable<number> { return of(0); }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: DashboardService, useValue: dashboardServiceMock }
      ]
    })
    .compileComponents();

    const dashboardService = TestBed.inject(DashboardService);
    component = new CurrentBodyfatComponent(dashboardService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
