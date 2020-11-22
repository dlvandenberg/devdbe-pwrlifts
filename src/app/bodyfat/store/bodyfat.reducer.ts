import { Bodyfat } from '@app-bodyfat/model/bodyfat.model';
import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as fromBodyfatActions from './bodyfat.actions';

export const featureKey = 'bodyfat';
export const selectState = createFeatureSelector<State>(featureKey);

export interface State {
    bodyfats: Bodyfat[];
    editing: boolean;
}

const initialState: State = {
    bodyfats: [],
    editing: false
};

const bodyfatReducer = createReducer(
    initialState,
    on(
        fromBodyfatActions.startEditing,
        (state) => ({ ...state, editing: true })
    ),
    on(
        fromBodyfatActions.cancelEditing,
        (state) => ({ ...state, editing: false })
    ),
    on(
        fromBodyfatActions.storeBodyfats,
        (state, { bodyfats }) => ({ ...state, editing: false, bodyfats: [...bodyfats ]})
    )
);

export function bodyfatReducerFn(state: State, action: Action): State {
    return bodyfatReducer(state, action);
}
