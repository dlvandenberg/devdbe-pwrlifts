import { createAction, props } from '@ngrx/store';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { Weight } from '@app-weight/model/weight.model';

export const startEditing = createAction('[Weight] Start Editing');

export const startEditingExisting = createAction(
    '[Weight] Start Editing Existing',
    props<{
        id: string,
        weight: number,
        calories: number,
        measuredOn: Date,
        partOfDayMeasured: TimeOfDay
    }>()
);

export const cancelEditing = createAction('[Weight] Cancel Editing');

export const createWeight = createAction(
    '[Weight] Create',
    props<{
        id: string,
        weight: number,
        calories: number,
        measuredOn: Date,
        partOfDayMeasured: TimeOfDay
    }>()
);

export const updateWeight = createAction(
    '[Weight] Update',
    props<{
        id: string,
        weight: number,
        calories: number,
        measuredOn: Date,
        partOfDayMeasured: TimeOfDay
    }>()
);

export const deleteWeight = createAction(
    '[Weight] Delete',
    props<{ id: string }>()
);

export const fetchWeights = createAction('[Weight] Fetch Weights');

export const storeWeights = createAction(
    '[Weight] Store Weights',
    props<{
        weights: Weight[]
    }>()
);
