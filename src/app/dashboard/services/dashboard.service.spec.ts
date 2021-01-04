import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  const storeMock: Partial<Store> = {
    dispatch(): void {},
    select(): Observable<any> {
      return of(null);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: storeMock }],
    });
    const store = TestBed.inject(Store);
    service = new DashboardService(store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
