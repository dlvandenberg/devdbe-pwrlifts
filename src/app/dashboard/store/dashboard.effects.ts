import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import * as fromDashboardActions from './dashboard.actions';
import * as fromAuth from '@app-auth/store/auth.reducer';
import { environment } from '@app-env/environment';

@Injectable()
export class DashboardEffects {
  fetchCurrentWeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDashboardActions.fetchCurrentWeight),
      withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
      exhaustMap(([_, authUserId]) =>
        this.http.get(environment.firebase.databaseUrl + 'weights/' + authUserId + '.json',
        {
            params: new HttpParams()
                .set('orderBy', '"measuredOn"')
                .set('endAt', new Date().getTime().toString())
                .set('limitToLast', '1')
        })
        .pipe(
        map(weight => {
            if (weight === null) {
                return fromDashboardActions.storeCurrentWeight({ currentWeight: 0 });
            }
            const measuredWeight = weight[Object.keys(weight)[0]].weight;
            console.log('m: ' + measuredWeight);
            return fromDashboardActions.storeCurrentWeight({ currentWeight: measuredWeight });
        })
        )
      )
    )
  );

  fetchCurrentBodyfat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDashboardActions.fetchCurrentBodyfat),
      withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
      exhaustMap(([_, authUserId]) =>
        this.http.get(environment.firebase.databaseUrl + 'bodyfats/' + authUserId + '.json',
        {
            params: new HttpParams()
                .set('orderBy', '"measuredOn"')
                .set('endAt', new Date().getTime().toString())
                .set('limitToLast', '1')
        })
        .pipe(
        map(bodyfat => {
            if (bodyfat === null) {
                return fromDashboardActions.storeCurrentBodyfat({ currentBodyfat: 0 });
            }
            const currentBodyfat = bodyfat[Object.keys(bodyfat)[0]].bodyfat;
            return fromDashboardActions.storeCurrentBodyfat({ currentBodyfat });
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
