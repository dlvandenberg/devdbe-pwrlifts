import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, exhaustMap, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as fromDashboardActions from './dashboard.actions';
import * as fromAuth from '@app-auth/store/auth.reducer';
import { environment } from '@app-env/environment';

@Injectable()
export class DashboardEffects {
  fetchCurrent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDashboardActions.fetchCurrent),
      withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
      mergeMap(([action, authUserId]) =>
        this.http.get(environment.firebase.databaseUrl + action.dashboardType.dbUrl + '/' + authUserId + '.json',
        {
            params: new HttpParams()
                .set('orderBy', '"date"')
                .set('endAt', new Date().getTime().toString())
                .set('limitToLast', '1')
        }).pipe(
            map(response => {
                if (response === null) {
                    return fromDashboardActions.storeCurrent({ dashboardType: action.dashboardType, current: 0 });
                }
                const current = response[Object.keys(response)[0]][action.dashboardType.dbPropertyName];
                return fromDashboardActions.storeCurrent({ dashboardType: action.dashboardType, current });
            })
        )
      )
    )
  );

  constructor(
    private readonly http: HttpClient,
    private readonly actions$: Actions,
    private readonly store: Store
  ) {}
}
