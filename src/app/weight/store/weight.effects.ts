import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromWeightActions from './weight.actions';
import * as fromAuth from '@app-auth/store/auth.reducer';
import { exhaustMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { environment } from '@app-env/environment';
import { Weight } from '../model/weight.model';
import { Store } from '@ngrx/store';

@Injectable()
export class WeightEffects {

    createWeight$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromWeightActions.createWeight),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([action, authUserId]) =>
                this.http.post(environment.firebase.databaseUrl + 'weights/' + authUserId + '.json', {
                    weight: action.weight,
                    calories: action.calories,
                    measuredOn: action.measuredOn.getTime(),
                    partOfDayMeasured: action.partOfDayMeasured,
                    createdOn: -1 * action.measuredOn.getTime()
                }).pipe(
                    map(() => fromWeightActions.fetchWeights())
                )
            )
        )
    );

    updateWeight$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromWeightActions.updateWeight),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([action, authUserId]) =>
                this.http.patch(environment.firebase.databaseUrl + 'weights/' + authUserId + '/' + action.id + '.json', {
                    weight: action.weight,
                    calories: action.calories,
                    measuredOn: action.measuredOn.getTime(),
                    partOfDayMeasured: action.partOfDayMeasured,
                    createdOn: -1 * action.measuredOn.getTime()
                }).pipe(
                    map(() => fromWeightActions.fetchWeights())
                )
            )
        )
    );

    deleteWeight$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromWeightActions.deleteWeight),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([ action, authUserId ]) =>
                this.http.delete(environment.firebase.databaseUrl + 'weights/' + authUserId + '/' + action.id + '.json')
                .pipe(
                    map(() => fromWeightActions.fetchWeights())
                )
            )
        )
    );

    fetchWeights$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromWeightActions.fetchWeights),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([_, authUserId]) =>
                this.http.get<Weight[]>(environment.firebase.databaseUrl + 'weights/' + authUserId + '.json',
                {
                    params: new HttpParams().set('orderBy', '"createdOn"').set('startAt', '' + (-1 * new Date().getTime()))
                })
                .pipe(
                    map(weights => {
                        const weightList: Weight[] = [];
                        if (weights === null) {
                            return fromWeightActions.storeWeights({ weights: []});
                        }
                        for (const i of Object.keys(weights)) {
                            const weight = weights[i];
                            weightList.push({
                                id: i,
                                ...weight,
                                measuredOn: new Date(weight.measuredOn)
                            });
                        }
                        return fromWeightActions.storeWeights({ weights: weightList });
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
