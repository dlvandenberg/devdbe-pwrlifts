import { Bodyfat } from '@app-bodyfat/model/bodyfat.model';
import { createAction, props } from '@ngrx/store';
import { TimeOfDay } from 'src/app/shared/model/time-of-day.enum';

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
        id: string,
        bodyfat: number,
        measuredOn: Date,
        partOfDayMeasured: TimeOfDay
    }>()
);

export const updateBodyfat = createAction(
    '[Bodyfat] Update',
    props<{
        id: string,
        bodyfat: number,
        measuredOn: Date,
        partOfDayMeasured: TimeOfDay
    }>()
);

export const fetchBodyfats = createAction('[Bodyfat] Fetch bodyfats');

export const storeBodyfats = createAction(
    '[Bodyfat] Store bodyfats',
    props<{
        bodyfats: Bodyfat[]
    }>()
);
