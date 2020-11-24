import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromOneRepMaxActions from './one-rep-max.actions';
import * as fromAuth from '@app-auth/store/auth.reducer';
import { exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { environment } from '@app-env/environment';
import { OneRepMax } from '../model/one-rep-max.model';

@Injectable()
export class OneRepMaxEffects {

    createOneRepMax$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOneRepMaxActions.createOneRepMax),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([ action, authUserId ]) =>
                this.http.post(environment.firebase.databaseUrl + action.exercise + '/' + authUserId + '.json', {
                    weight: action.weight,
                    reps: action.reps,
                    oneRepMax: action.oneRepMax,
                    calculated: action.calculated,
                    date: action.date.getTime(),
                    time: action.time,
                    rpe: action.rpe
                }).pipe(
                    map(() => fromOneRepMaxActions.fetchOneRepMaxes({ exercise: action.exercise }))
                )
            )
        )
    );

    updateOneRepMax$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOneRepMaxActions.updateOneRepMax),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([ action, authUserId ]) =>
                this.http.patch(environment.firebase.databaseUrl + action.exercise + '/' + authUserId + '/' + action.id + '.json', {
                    weight: action.weight,
                    reps: action.reps,
                    oneRepMax: action.oneRepMax,
                    calculated: action.calculated,
                    date: action.date.getTime(),
                    time: action.time,
                    rpe: action.rpe
                }).pipe(
                    map(() => fromOneRepMaxActions.fetchOneRepMaxes({ exercise: action.exercise }))
                )
            )
        )
    );

    deleteOneRepMax$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOneRepMaxActions.deleteOneRepMax),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([ action, authUserId ]) =>
                this.http.delete(environment.firebase.databaseUrl + action.exercise + '/' + authUserId + '/' + action.id + '.json')
                .pipe(
                    map(() => fromOneRepMaxActions.fetchOneRepMaxes({ exercise: action.exercise }))
                )
            )
        )
    );

    fetchOneRepMaxes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromOneRepMaxActions.fetchOneRepMaxes),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([ action, authUserId ]) =>
                this.http.get<OneRepMax[]>(environment.firebase.databaseUrl + action.exercise + '/' + authUserId + '.json', {
                    params: new HttpParams()
                        .set('orderBy', '"date"')
                        .set('endAt', new Date().getTime().toString())
                })
                .pipe(
                    map(oneRepMaxes => {
                        const oneRepMaxList: OneRepMax[] = [];
                        if (oneRepMaxList === null) {
                            return fromOneRepMaxActions.storeOneRepMaxes({ exercise: action.exercise, oneRepMaxes: [] });
                        }
                        for (const i of Object.keys(oneRepMaxes)) {
                            const oneRepMax = oneRepMaxes[i];
                            oneRepMaxList.push({
                                id: i,
                                ...oneRepMax,
                                date: new Date(oneRepMax.date)
                            });
                        }
                        const sortedList = oneRepMaxList.sort((a, b) => b.date.getTime() - a.date.getTime());
                        return fromOneRepMaxActions.storeOneRepMaxes({ exercise: action.exercise, oneRepMaxes: sortedList });
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
