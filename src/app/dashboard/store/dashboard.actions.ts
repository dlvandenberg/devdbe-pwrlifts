import { DashboardType } from '@app-dashboard/model/dashboard-type.enum';
import { createAction, props } from '@ngrx/store';

export const fetchCurrent = createAction(
    '[Dashboard] Fetch Current',
    props<{ dashboardType: DashboardType }>()
);

export const storeCurrent = createAction(
    '[Dashboard] Store Current',
    props<{
        dashboardType: DashboardType,
        current: number
    }>()
);
