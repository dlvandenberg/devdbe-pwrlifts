import { createAction, props } from '@ngrx/store';

export const fetchCurrentWeight = createAction('[Dashboard] Fetch Current Weight');

export const storeCurrentWeight = createAction(
    '[Dashboard] Store Current Weight',
    props<{ currentWeight: number }>()
);

export const fetchCurrentBodyfat = createAction('[Dashboard] Fetch Current Bodyfat');

export const storeCurrentBodyfat = createAction(
    '[Dashboard] Store Current Bodyfat',
    props<{ currentBodyfat: number }>()
);
