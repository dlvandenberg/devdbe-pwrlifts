import { Injectable } from '@angular/core';
import * as fromDashboardActions from '@app-dashboard/store/dashboard.actions';
import * as fromDashboard from '@app-dashboard/store/dashboard.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private readonly store: Store) { }

  get currentWeight$(): Observable<number> {
    return this.store.select(fromDashboard.selectState).pipe(
      map(state => state.currentWeight),
      distinctUntilChanged()
    );
  }

  get loadingCurrentWeight$(): Observable<boolean> {
    return this.store.select(fromDashboard.selectState).pipe(
      map(state => state.loadingCurrentWeight),
      distinctUntilChanged()
    );
  }

  get currentBodyfat$(): Observable<number> {
    return this.store.select(fromDashboard.selectState).pipe(
      map(state => state.currentBodyfat),
      distinctUntilChanged()
    );
  }

  get loadingCurrentBodyfat$(): Observable<boolean> {
    return this.store.select(fromDashboard.selectState).pipe(
      map(state => state.loadingCurrentBodyfat),
      distinctUntilChanged()
    );
  }

  public fetchCurrentWeight(): void {
    return this.store.dispatch(fromDashboardActions.fetchCurrentWeight());
  }

  public fetchCurrentBodyfat(): void {
    return this.store.dispatch(fromDashboardActions.fetchCurrentBodyfat());
  }
}
