import { Bodyfat } from '@app-bodyfat/model/bodyfat.model';
import { createAction, props } from '@ngrx/store';
import { TimeOfDay } from '@app-types/time-of-day.enum';

export const startEditing = createAction('[Bodyfat] Start Editing');

export const startEditingExisting = createAction(
    '[Bodyfat] Start Editing Existing',
    props<{
        bodyfat: Bodyfat
    }>()
);

export const cancelEditing = createAction('[Bodyfat] Cancel editing');

export const createBodyfat = createAction(
    '[Bodyfat] Create',
    props<{
        bodyfat: number,
        date: Date,
        time: TimeOfDay
    }>()
);

export const updateBodyfat = createAction(
    '[Bodyfat] Update',
    props<{
        id?: string,
        bodyfat: number,
        date: Date,
        time: TimeOfDay
    }>()
);

export const deleteBodyfat = createAction(
    '[Bodyfat] Delete',
    props<{ id: string }>()
);

export const fetchBodyfats = createAction('[Bodyfat] Fetch bodyfats');

export const storeBodyfats = createAction(
    '[Bodyfat] Store bodyfats',
    props<{
        bodyfats: Bodyfat[]
    }>()
);
