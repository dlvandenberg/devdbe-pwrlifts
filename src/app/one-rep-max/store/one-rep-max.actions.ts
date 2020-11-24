import { createAction, props } from '@ngrx/store';
import { TimeOfDay } from 'src/app/shared/model/time-of-day.enum';
import { Exercise } from '../model/exercise.enum';
import { OneRepMax } from '../model/one-rep-max.model';

export const createOneRepMax = createAction(
    '[OneRepMax] Create',
    props<{
        exercise: Exercise,
        weight: number,
        reps: number,
        oneRepMax: number,
        calculated: boolean,
        date: Date,
        time: TimeOfDay,
        rpe: number
    }>()
);

export const updateOneRepMax = createAction(
    '[OneRepMax] Update',
    props<{
        id: string,
        exercise: Exercise,
        weight: number,
        reps: number,
        oneRepMax: number,
        calculated: boolean,
        date: Date,
        time: TimeOfDay,
        rpe: number
    }>()
);

export const deleteOneRepMax = createAction(
    '[OneRepMax] Delete',
    props<{
        id: string,
        exercise: Exercise
    }>()
);

export const fetchOneRepMaxes = createAction(
    '[OneRepMax] Fetch',
    props<{ exercise: Exercise }>()
);

export const storeOneRepMaxes = createAction(
    '[OneRepMax] Store',
    props<{
        exercise: Exercise,
        oneRepMaxes: OneRepMax[]
    }>()
);

export const startEditing = createAction('[OneRepMax] Start Editing');

export const startEditingExisting = createAction(
    '[OneRepMax] Start Editing Existing',
    props<{
        oneRepMax: OneRepMax
    }>()
);

export const cancelEditing = createAction('[OneRepMax] Cancel Editing');
