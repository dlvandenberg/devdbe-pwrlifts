import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { AuthUser } from '../model/auth-user.model';
import * as fromAuthActions from './auth.actions';

export const featureKey = 'auth';
export const selectState = createFeatureSelector<State>(featureKey);

export interface State {
    authUser: AuthUser;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    authUser: null,
    authError: null,
    loading: false
};

const authReducer = createReducer(
    initialState,
    on(
        fromAuthActions.logout,
        (state) => ({ ...state, user: null })
    ),
    on(
        fromAuthActions.loginStart,
        (state) => ({ ...state, authError: null, loading: true })
    ),
    on(
        fromAuthActions.signUpStart,
        (state) => ({ ...state, authError: null, loading: true, user: null })
    ),
    on(
        fromAuthActions.authenticateSuccess,
        (state, { email, userId, token, refreshToken, expirationDate }) => ({
            ...state,
            authUser: new AuthUser(userId, email, token, expirationDate, refreshToken),
            authError: null,
            loading: false
        })
    ),
    on(
        fromAuthActions.authenticateFail,
        (state, { errorMessage }) => ({ ...state, authError: errorMessage, loading: false })
    ),
    on(
        fromAuthActions.clearError,
        (state) => ({ ...state, authError: null })
    )
);

export function authReducerFn(state: State, action: Action): State {
    return authReducer(state, action);
}
