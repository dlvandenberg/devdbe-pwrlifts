import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Weight } from '@app-weight/model/weight.model';
import * as fromWeightActions from './weight.actions';

export const featureKey = 'weight';
export const selectState = createFeatureSelector<State>(featureKey);

export interface State {
    weights: Weight[];
    editing: boolean;
    editingWeight: Weight;
}

const initialState: State = {
    weights: [],
    editing: false,
    editingWeight: null
};

const weightReducer = createReducer(
    initialState,
    on(
        fromWeightActions.startEditing,
        (state) => ({ ...state, editing: true, editingWeight: null })
    ),
    on(
        fromWeightActions.cancelEditing,
        (state) => ({ ...state, editing: false, editingWeight: null })
    ),
    on(
        fromWeightActions.startEditingExisting,
        (state, { id, weight, calories, date, time }) => ({
            ...state,
            editing: true,
            editingWeight: {
                id,
                weight,
                calories,
                date,
                time
            }
        })
    ),
    on(
        fromWeightActions.storeWeights,
        (state, { weights }) => ({ ...state, editing: false, weights: [...weights], editingWeight: null })
    )
);

export function weightReducerFn(state: State, action: Action): State {
    return weightReducer(state, action);
}
