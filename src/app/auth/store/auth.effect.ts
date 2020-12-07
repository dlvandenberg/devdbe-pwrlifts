import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from '@app-auth/model/auth-user.model';
import { AuthService } from '@app-auth/services/auth.service';
import { environment } from '@app-env/environment';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap, tap, map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';

import * as fromAuthActions from './auth.actions';
import * as fromUserActions from '@app-user/store/user.actions';
import { Store } from '@ngrx/store';

const signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebase.apiKey;
const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebase.apiKey;
const refreshTokenUrl = 'https://securetoken.googleapis.com/v1/token?key=' + environment.firebase.apiKey;

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered: boolean;
}

interface RefreshResponseData {
    expires_in: string;
    token_type: string;
    refresh_token: string;
    id_token: string;
    user_id: string;
    project_id: string;
}

const handleAuthentication = (
    userId: string,
    email: string,
    token: string,
    refreshToken: string,
    expiresIn: number,
    rememberMe: boolean
) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new AuthUser(userId, email, token, refreshToken, expirationDate, rememberMe);
    localStorage.setItem('userData', JSON.stringify(user));
    return fromAuthActions.authenticateSuccess({
        userId,
        email,
        token,
        refreshToken,
        expirationDate,
        redirect: true,
        rememberMe
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
                    tap(responseData => this.authService.setTokenExpireTimer(+responseData.expiresIn * 1000, fromAuthActions.logout())),
                    switchMap(response => of(
                        handleAuthentication(
                            response.localId,
                            response.email,
                            response.idToken,
                            response.refreshToken,
                            +response.expiresIn,
                            false),
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
                    tap(responseData => {
                        const actionToPerform = action.rememberMe ?
                        fromAuthActions.refreshToken({ email: responseData.refreshToken, refreshToken: responseData.refreshToken })
                        : fromAuthActions.logout();
                        return this.authService.setTokenExpireTimer(+responseData.expiresIn * 15000, actionToPerform);
                    }),
                    map(response => handleAuthentication(
                        response.localId,
                        response.email,
                        response.idToken,
                        response.refreshToken,
                        +response.expiresIn,
                        action.rememberMe
                    )),
                    catchError(errorResponse => handleError(errorResponse))
                )
            )
        )
    );

    authRefreshToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.refreshToken),
            exhaustMap(action =>
                this.http.post<RefreshResponseData>(refreshTokenUrl, {
                    grant_type: 'refresh_token',
                    refresh_token: action.refreshToken
                }).pipe(
                    map(response => fromAuthActions.authenticateSuccess({
                            userId: response.user_id,
                            email: action.email,
                            token: response.id_token,
                            refreshToken: response.refresh_token,
                            expirationDate: new Date(new Date().getTime() + +response.expires_in * 1000),
                            redirect: false,
                            rememberMe: true
                        })),
                    catchError(errorResponse => {
                        console.log('error in refreshing token: ');
                        console.log(errorResponse);
                        return of(fromAuthActions.logout());
                    })
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
                this.router.navigate(['auth']);
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
                        redirect: false,
                        rememberMe: true
                    });
                } else {
                    return fromAuthActions.refreshToken({ email: parsedUser.email, refreshToken: parsedUser.refreshToken });
                }
            })
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly store: Store
    ) { }
}
