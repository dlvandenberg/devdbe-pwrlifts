import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Weight } from '../model/weight.model';
import * as fromWeightActions from './weight.actions';

export const featureKey = 'weight';
export const selectState = createFeatureSelector<State>(featureKey);

export interface State {
    weights: Weight[];
    editing: boolean;
}

const initialState: State = {
    weights: [],
    editing: false
};

const weightReducer = createReducer(
    initialState,
    on(
        fromWeightActions.startEditing,
        (state) => ({ ...state, editing: true })
    ),
    on(
        fromWeightActions.cancelEditing,
        (state) => ({ ...state, editing: false })
    ),
    on(
        fromWeightActions.storeWeights,
        (state, { weights }) => ({ ...state, editing: false, weights: [...weights] })
    )
);

export function weightReducerFn(state: State, action: Action): State {
    return weightReducer(state, action);
}
