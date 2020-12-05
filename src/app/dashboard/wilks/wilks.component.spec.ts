import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardType } from '@app-dashboard/model/dashboard-type.enum';
import { DashboardService } from '@app-dashboard/services/dashboard.service';
import { Observable, of } from 'rxjs';

import { CurrentComponent } from './wilks.component';

describe('CurrentComponent', () => {
  let component: CurrentComponent;
  const dashboardServiceMock: Partial<DashboardService> = {
    fetchCurrent(type: DashboardType): void {},
    current$(type: DashboardType): Observable<number> { return of(0); },
    loading$(type: DashboardType): Observable<boolean> { return of(false); }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ { provide: DashboardService, useValue: dashboardServiceMock }]
    })
    .compileComponents();

    const dashboardService = TestBed.inject(DashboardService);
    component = new CurrentComponent(dashboardService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
