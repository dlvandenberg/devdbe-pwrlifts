import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app-env/environment';
import { Gender } from '@app-types/gender.enum';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import * as fromUserActions from './user.actions';

interface UserResponseData {
    id: string;
    firstName: string;
    lastName?: string;
    dateOfBirth: Date;
    email: string;
    gender: Gender;
}

@Injectable()
export class UserEffects {

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUserActions.createUser),
            exhaustMap(action =>
                this.http.put<UserResponseData>(environment.firebase.databaseUrl + 'users/' + action.id + '.json', {
                    firstName: action.firstName,
                    lastName: action.lastName,
                    dateOfBirth: action.dateOfBirth,
                    gender: action.gender,
                    email: action.email
                }).pipe(map(response => fromUserActions.storeUser({
                    id: action.id,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    dateOfBirth: new Date(response.dateOfBirth),
                    gender: response.gender,
                    email: response.email
                })))
            )
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUserActions.updateUser),
            exhaustMap(action =>
                this.http.put<UserResponseData>(environment.firebase.databaseUrl + 'users/' + action.id + '.json', {
                    firstName: action.firstName,
                    lastName: action.lastName,
                    dateOfBirth: action.dateOfBirth,
                    gender: action.gender,
                    email: action.email
                }).pipe(
                    map(response => fromUserActions.storeUser({
                        id: action.id,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        dateOfBirth: new Date(response.dateOfBirth),
                        gender: response.gender,
                        email: response.email
                    })),
                    catchError(() => of(fromUserActions.userError({ errorMessage: 'Failed to update user' })))
                )
            )
        )
    );

    fetchUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUserActions.fetchUser),
            exhaustMap(action =>
                this.http.get<UserResponseData>(environment.firebase.databaseUrl + 'users/' + action.id + '.json').pipe(
                    map(response => fromUserActions.storeUser({
                        id: action.id,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        dateOfBirth: new Date(response.dateOfBirth),
                        gender: response.gender,
                        email: response.email
                    })),
                    catchError(() => of(fromUserActions.userError({ errorMessage: 'Failed to retrieve user' })))
                )
            )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly http: HttpClient
    ) { }
}
