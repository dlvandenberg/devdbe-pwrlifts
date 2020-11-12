import { Gender } from '@app-types/gender.enum';
import { createAction, props } from '@ngrx/store';

export const loginStart = createAction(
    '[Auth] Login Start',
    props<{
        email: string,
        password: string
    }>()
);

export const signUpStart = createAction(
    '[Auth] Sign Up Start',
    props<{
        firstName: string,
        lastName?: string,
        gender: Gender,
        dateOfBirth: Date,
        email: string,
        password: string
    }>()
);

export const logout = createAction('[Auth] Logout');

export const authenticateSuccess = createAction(
    '[Auth] Authenticate Success',
    props<{
        userId: string,
        email: string,
        token: string,
        refreshToken: string,
        expirationDate: Date,
        redirect: boolean
    }>()
);

export const authenticateFail = createAction(
    '[Auth] Authenticate Fail',
    props<{
        errorMessage: string
    }>()
);

export const clearError = createAction('[Auth] Clear Error');

export const autoLogin = createAction('[Auth] Auto Login');
