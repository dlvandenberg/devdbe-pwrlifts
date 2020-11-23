import { Injectable } from '@angular/core';
import * as fromBodyfatActions from './bodyfat.actions';
import * as fromAuth from '@app-auth/store/auth.reducer';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { environment } from '@app-env/environment';
import { Bodyfat } from '@app-bodyfat/model/bodyfat.model';

@Injectable()
export class BodyfatEffects {

    createBodyfat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBodyfatActions.createBodyfat),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([action, authUserId]) =>
                this.http.post(environment.firebase.databaseUrl + 'bodyfats/' + authUserId + '.json', {
                    bodyfat: action.bodyfat,
                    measuredOn: action.measuredOn.getTime(),
                    partOfDayMeasured: action.partOfDayMeasured
                }).pipe(
                    map(() => fromBodyfatActions.fetchBodyfats())
                )
            )
        )
    );

    updateBodyfat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBodyfatActions.updateBodyfat),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([ action, authUserId ]) =>
                this.http.patch(environment.firebase.databaseUrl + 'bodyfats/' + authUserId + '/' + action.id + '.json', {
                    bodyfat: action.bodyfat,
                    measuredOn: action.measuredOn.getTime(),
                    partOfDayMeasured: action.partOfDayMeasured
                }).pipe(
                    map(() => fromBodyfatActions.fetchBodyfats())
                )
            )
        )
    );

    deleteBodyfat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBodyfatActions.deleteBodyfat),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([ action, authUserId ]) =>
                this.http.delete(environment.firebase.databaseUrl + 'bodyfats/' + authUserId + '/' + action.id + '.json')
                .pipe(
                    map(() => fromBodyfatActions.fetchBodyfats())
                )
            )
        )
    );

    fetchBodyfats$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBodyfatActions.fetchBodyfats),
            withLatestFrom(this.store.select(fromAuth.selectAuthUserId)),
            exhaustMap(([_, authUserId]) =>
                this.http.get<Bodyfat[]>(environment.firebase.databaseUrl + 'bodyfats/' + authUserId + '.json',
                {
                    params: new HttpParams()
                        .set('orderBy', '"measuredOn"')
                        .set('endAt', new Date().getTime().toString())
                }).pipe(
                    map(bodyfats => {
                        const bodyfatList: Bodyfat[] = [];
                        if (bodyfats === null) {
                            return fromBodyfatActions.storeBodyfats({ bodyfats: [] });
                        }
                        for (const i of Object.keys(bodyfats)) {
                            const bodyfat = bodyfats[i];
                            bodyfatList.push({
                                id: i,
                                ...bodyfat,
                                measuredOn: new Date(bodyfat.measuredOn)
                            });
                        }
                        const sortedList = bodyfatList.sort((a, b) => b.measuredOn.getTime() - a.measuredOn.getTime());
                        return fromBodyfatActions.storeBodyfats({ bodyfats: sortedList });
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
