import { Injectable } from '@angular/core';
import * as fromBodyMeasurementActions from './body-measurement.actions';
import * as fromAuth from '@app-auth/store/auth.reducer';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { environment } from '@app-env/environment';
import { BodyMeasurement } from '@app-body-measurement/model/body-measurement.model';

@Injectable()
export class BodyMeasurementEffects {

    createMeasurement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBodyMeasurementActions.createBodyMeasurement),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([action, authUserId]) =>
                this.http.post(environment.firebase.databaseUrl + action.measurementType.name + '/' + authUserId + '.json', {
                    measurement: action.measurement,
                    calories: action.calories,
                    date: action.date.getTime(),
                    time: action.time
                }).pipe(
                    map(() => fromBodyMeasurementActions.fetchBodyMeasurements({ measurementType: action.measurementType }))
                )
            )
        )
    );

    updateMeasurement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBodyMeasurementActions.updateBodyMeasurement),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([ action, authUserId ]) =>
                this.http.patch(environment.firebase.databaseUrl + action.measurementType.name + '/' + authUserId + '/' + action.id + '.json', {
                    measurement: action.measurement,
                    calories: action.calories,
                    date: action.date.getTime(),
                    time: action.time
                }).pipe(
                    map(() => fromBodyMeasurementActions.fetchBodyMeasurements({ measurementType: action.measurementType }))
                )
            )
        )
    );

    deleteMeasurement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBodyMeasurementActions.deleteBodyMeasurement),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([ action, authUserId ]) =>
                this.http.delete(environment.firebase.databaseUrl + action.measurementType.name + '/' + authUserId + '/' + action.id + '.json')
                .pipe(
                    map(() => fromBodyMeasurementActions.fetchBodyMeasurements({ measurementType: action.measurementType }))
                )
            )
        )
    );

    fetchMeasurements$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBodyMeasurementActions.fetchBodyMeasurements),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([action, authUserId]) =>
                this.http.get<BodyMeasurement[]>(
                    environment.firebase.databaseUrl + action.measurementType.name + '/' + authUserId + '.json',
                {
                    params: new HttpParams()
                        .set('orderBy', '"date"')
                        .set('endAt', new Date().getTime().toString())
                }).pipe(
                    map(measurements => {
                        const measurementList: BodyMeasurement[] = [];
                        if (measurements === null) {
                            return fromBodyMeasurementActions.storeBodyMeasurements({
                                measurementType: action.measurementType,
                                measurements: []
                            });
                        }
                        for (const i of Object.keys(measurements)) {
                            const measurement = measurements[i];
                            measurementList.push({
                                id: i,
                                ...measurement,
                                date: new Date(measurement.date)
                            });
                        }
                        const sortedList = measurementList.sort((a, b) => b.date.getTime() - a.date.getTime());
                        return fromBodyMeasurementActions.storeBodyMeasurements({
                            measurementType: action.measurementType,
                            measurements: sortedList
                        });
                    })
                )
            )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly http: HttpClient,
        private readonly store: Store
    ) { }
}
