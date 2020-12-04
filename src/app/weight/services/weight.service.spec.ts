import { TestBed } from '@angular/core/testing';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { WeightService } from './weight.service';

describe('WeightService', () => {
  let service: WeightService;
  const storeMock: Partial<Store> = {
    dispatch(action: Action): void {},
    select(): Observable<any> { return of({}); }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ { provide: Store, useValue: storeMock }]
    });
    const store = TestBed.inject(Store);
    service = new WeightService(store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
