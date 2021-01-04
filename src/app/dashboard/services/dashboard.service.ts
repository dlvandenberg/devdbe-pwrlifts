import { Injectable } from '@angular/core';
import { DashboardType } from '@app-dashboard/model/dashboard-type.enum';
import * as fromDashboardActions from '@app-dashboard/store/dashboard.actions';
import * as fromDashboard from '@app-dashboard/store/dashboard.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private readonly store: Store) { }

  get wilks$(): Observable<number> {
    return this.store.select(fromDashboard.selectState).pipe(
      map(state => state.wilksScore),
      distinctUntilChanged()
    );
  }

  get calculatingWilks$(): Observable<boolean> {
    return this.store.select(fromDashboard.selectState).pipe(
      map(state => state.loadingWilksScore),
      distinctUntilChanged()
    );
  }

  public current$(type: DashboardType): Observable<number> {
    return this.store.select(fromDashboard.selectState).pipe(
      map(state => {
        const property = 'current' + type.name;
        return state[property];
      }),
      distinctUntilChanged()
    );
  }

  public loading$(type: DashboardType): Observable<boolean> {
    return this.store.select(fromDashboard.selectState).pipe(
      map(state => {
        const property = 'loading' + type.name;
        return state[property];
      }),
      distinctUntilChanged()
    );
  }

  public fetchCurrent(type: DashboardType): void {
    this.store.dispatch(fromDashboardActions.fetchCurrent({ dashboardType: type }));
  }

  public calculateWilks(): void {
    this.store.dispatch(fromDashboardActions.calculateWilksScore());
  }
}
