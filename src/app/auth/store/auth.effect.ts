import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from '@app-auth/model/auth-user.model';
import { AuthService } from '@app-auth/services/auth.service';
import { environment } from '@app-env/environment';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap, tap, map, catchError, switchMap } from 'rxjs/operators';

import * as fromAuthActions from './auth.actions';
import * as fromUserActions from '@app-user/store/user.actions';

const signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebase.apiKey;
const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebase.apiKey;

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered: boolean;
}

const handleAuthentication = (
    userId: string,
    email: string,
    token: string,
    refreshToken: string,
    expiresIn: number
) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new AuthUser(email, userId, token, expirationDate, refreshToken);
    localStorage.setItem('userData', JSON.stringify(user));
    return fromAuthActions.authenticateSuccess({
        userId,
        email,
        token,
        refreshToken,
        expirationDate,
        redirect: true
    });
};

const handleError = (errorResponse: HttpErrorResponse) => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
        return of(fromAuthActions.authenticateFail({ errorMessage }));
    }
    switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists';
            break;
        case 'EMAIL_NOT_FOUND':
        case 'INVALID_PASSWORD':
            errorMessage = 'Invalid credentials';
            break;
    }
    return of(fromAuthActions.authenticateFail({ errorMessage }));
};

@Injectable()
export class AuthEffects {

    authSignUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.signUpStart),
            exhaustMap(action =>
                this.http.post<AuthResponseData>(signUpUrl, {
                    email: action.email,
                    password: action.password,
                    returnSecureToken: true
                }).pipe(
                    tap(responseData => this.authService.setLogoutTimer(+responseData.expiresIn * 1000)),
                    switchMap(response => of(
                        handleAuthentication(
                            response.localId,
                            response.email,
                            response.idToken,
                            response.refreshToken,
                            +response.expiresIn),
                        fromUserActions.createUser({
                            id: response.localId,
                            firstName: action.firstName,
                            lastName: action.lastName,
                            dateOfBirth: action.dateOfBirth,
                            email: action.email,
                            gender: action.gender
                        })
                    )),
                    catchError(errorResponse => handleError(errorResponse))
                )
            )
        )
    );

    authLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.loginStart),
            exhaustMap(action =>
                this.http.post<AuthResponseData>(loginUrl, {
                    email: action.email,
                    password: action.password,
                    returnSecureToken: true
                }).pipe(
                    tap(responseData => this.authService.setLogoutTimer(+responseData.expiresIn * 1000)),
                    map(response => handleAuthentication(
                        response.localId,
                        response.email,
                        response.idToken,
                        response.refreshToken,
                        +response.expiresIn
                    )),
                    catchError(errorResponse => handleError(errorResponse))
                )
            )
        )
    );

    authRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.authenticateSuccess),
            tap(action => {
                if (action.redirect) {
                    this.router.navigate(['/dashboard']);
                }
            })
        ), { dispatch: false }
    );

    authLogout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.logout),
            tap(() => {
                this.authService.clearLogoutTimer();
                localStorage.removeItem('userData');
                this.router.navigate(['/auth']);
            })
        ), { dispatch: false }
    );

    autoLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.autoLogin),
            map(() => {
                const parsedUser: {
                    id: string,
                    email: string,
                    token: string,
                    expirationDate: string,
                    refreshToken: string
                } = JSON.parse(localStorage.getItem('userData'));
                if (!parsedUser) {
                    return { type: 'DUMMY' };
                }
                const expirationDate = new Date(parsedUser.expirationDate);
                if (expirationDate && new Date() < expirationDate) {
                    return fromAuthActions.authenticateSuccess({
                        userId: parsedUser.id,
                        email: parsedUser.email,
                        token: parsedUser.token,
                        refreshToken: parsedUser.refreshToken,
                        expirationDate: new Date(parsedUser.expirationDate),
                        redirect: false
                    });
                } else {
                    return { type: 'DUMMY' };
                }
            })
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly authService: AuthService
    ) { }
}
