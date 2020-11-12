import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { User } from '../model/user.model';
import * as fromUserActions from './user.actions';

export const featureKey = 'user';
export const selectState = createFeatureSelector<State>(featureKey);

export interface State {
    user: User;
}

const initialState: State = {
    user: null
};

const userReducer = createReducer(
    initialState,
    on(
        fromUserActions.storeUser,
        (state, { id, firstName, lastName, dateOfBirth, gender, email }) => ({
            ...state,
            user: new User(
                id,
                firstName,
                lastName,
                dateOfBirth,
                gender,
                email
            )})
    )
);

export function userReducerFn(state: State, action: Action): State {
    return userReducer(state, action);
}
