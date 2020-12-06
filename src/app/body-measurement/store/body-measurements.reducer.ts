import { BodyMeasurement } from '@app-body-measurement/model/bodyfat.model';
import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as fromBodyMeasurementActions from './body-measurement.actions';

export const featureKey = 'body-measurements';
export const selectState = createFeatureSelector<State>(featureKey);

export interface State {
    bodyfat: BodyMeasurement[];
    weight: BodyMeasurement[];
    editing: boolean;
    editingMeasurement: BodyMeasurement;
}

const initialState: State = {
    bodyfat: [],
    weight: [],
    editing: false,
    editingMeasurement: null
};

const bodyMeasurementReducer = createReducer(
    initialState,
    on(
        fromBodyMeasurementActions.startEditing,
        (state) => ({ ...state, editing: true })
    ),
    on(
        fromBodyMeasurementActions.startEditingExisting,
        (state, { measurement }) => ({ ...state, editing: true, editingMeasurement: measurement })
    ),
    on(
        fromBodyMeasurementActions.cancelEditing,
        (state) => ({ ...state, editing: false, editingMeasurement: null })
    ),
    on(
        fromBodyMeasurementActions.storeBodyMeasurements,
        (state, { measurementType, measurements }) =>
            ({ ...state, editing: false, editingMeasurement: null, [measurementType.name.toLowerCase()]: [...measurements ]})
    )
);

export function bodyMeasurementReducerFn(state: State, action: Action): State {
    return bodyMeasurementReducer(state, action);
}
