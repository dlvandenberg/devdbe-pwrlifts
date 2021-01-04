import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, mergeMap, skipUntil, skipWhile, tap, withLatestFrom } from 'rxjs/operators';
import * as fromDashboardActions from './dashboard.actions';
import * as fromDashboard from './dashboard.reducer';
import * as fromAuth from '@app-auth/store/auth.reducer';
import * as fromUser from '@app-user/store/user.reducer';
import { environment } from '@app-env/environment';
import { Gender } from '@app-types/gender.enum';
import { of } from 'rxjs';

interface Coefficients {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

const maleCoefficients: Coefficients = {
  a: -216.0475144,
  b: 16.2606339,
  c: -0.002388645,
  d: -0.00113732,
  e: 0.00000701863,
  f: -0.00000001291,
};

const femaleCoefficients: Coefficients = {
  a: 594.31747775582,
  b: -27.23842536447,
  c: 0.82112226871,
  d: -0.00930733913,
  e: 0.00004731582,
  f: -0.00000009054,
};

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

  calculateWilks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDashboardActions.storeCurrent),
      tap(() => this.store.dispatch(fromDashboardActions.calculateWilksScore())),
      withLatestFrom(
        this.store.select(fromDashboard.selectWilksData),
        this.store.select(fromUser.selectUserGender)),
      exhaustMap(([_, data, gender]) => {
        const wilksCo: Coefficients = gender === Gender.MALE ? maleCoefficients : femaleCoefficients;
        const weight = data.weight;
        const wilksCoefficient = 500 /
          (wilksCo.a
            + (wilksCo.b * weight)
            + (wilksCo.c * Math.pow(weight, 2))
            + (wilksCo.d * Math.pow(weight, 3))
            + (wilksCo.e * Math.pow(weight, 4))
            + (wilksCo.f * Math.pow(weight, 5))
          );
        const totalWeight = data.squat + data.benchpress + data.deadlift;
        const wilksScore = totalWeight * wilksCoefficient;
        return of(fromDashboardActions.storeWilksScore({ score: wilksScore }));
      })
    )
  );

  constructor(
    private readonly http: HttpClient,
    private readonly actions$: Actions,
    private readonly store: Store
  ) {}
}
