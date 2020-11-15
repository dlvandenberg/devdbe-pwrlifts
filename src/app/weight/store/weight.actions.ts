import { createAction, props } from '@ngrx/store';
import { TimeOfDay } from '../model/time-of-day.enum';
import { Weight } from '../model/weight.model';

export const startEditing = createAction('[Weight] Start Editing');

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

export const fetchWeights = createAction('[Weight] Fetch Weights');

export const storeWeights = createAction(
    '[Weight] Store Weights',
    props<{
        weights: Weight[]
    }>()
);
