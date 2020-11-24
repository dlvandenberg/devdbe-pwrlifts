import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Exercise } from '../model/exercise.enum';
import { OneRepMax } from '../model/one-rep-max.model';

import * as fromOneRepMaxActions from './one-rep-max.actions';

export const featureKey = 'oneRepMax';
export const selectState = createFeatureSelector<State>(featureKey);

interface State {
    squat: OneRepMax[];
    deadlift: OneRepMax[];
    benchpress: OneRepMax[];

    editing: boolean;
    editingOneRepMax: OneRepMax;
}

const initialState: State = {
    squat: [],
    deadlift: [],
    benchpress: [],
    editing: false,
    editingOneRepMax: null
};

const oneRepMaxReducer = createReducer(
    initialState,
    on(
        fromOneRepMaxActions.startEditing,
        (state) => ({ ...state, editing: true })
    ),
    on(
        fromOneRepMaxActions.startEditingExisting,
        (state, { oneRepMax }) => ({ ...state, editing: true, editingOneRepMax: oneRepMax })
    ),
    on(
        fromOneRepMaxActions.cancelEditing,
        (state) => ({ ...state, editing: false, editingOneRepMax: null })
    ),
    on(
        fromOneRepMaxActions.storeOneRepMaxes,
        (state, { exercise, oneRepMaxes }) => ({ ...state, editing: false, editingOneRepMax: null, [exercise]: [...oneRepMaxes ] })
    )
);

export function oneRepMaxReducerFn(state: State, action: Action): State {
    return oneRepMaxReducer(state, action);
}
