import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { IUser, User } from '@app-user/model/user.model';
import * as fromUserActions from './user.actions';

export const featureKey = 'user';
export const selectState = createFeatureSelector<State>(featureKey);

export interface State {
    user: IUser;
    userError: string;
    savingChanges: boolean;
    changesSaved: boolean;
}

const initialState: State = {
    user: null,
    userError: null,
    savingChanges: false,
    changesSaved: null,
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
            ),
            userError: null,
            changesSaved: state.savingChanges ? true : state.changesSaved,
            savingChanges: false
        })
    ),
    on(
        fromUserActions.updateUser,
        (state) => ({
            ...state,
            savingChanges: true,
            changesSaved: false,
            userError: false
        })
    ),
    on(
        fromUserActions.userError,
        (state, { errorMessage }) => ({
            ...state,
            userError: errorMessage,
            changesSaved: false,
            savingChanges: false
        })
    ),
    on(
        fromUserActions.clearError,
        (state) => ({ ...state, userError: null })
    )
);

export function userReducerFn(state: State, action: Action): State {
    return userReducer(state, action);
}
