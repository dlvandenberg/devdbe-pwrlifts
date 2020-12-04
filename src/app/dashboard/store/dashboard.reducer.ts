import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as fromDashboardActions from './dashboard.actions';

export const featureKey = 'dashboard';
export const selectState = createFeatureSelector<State>(featureKey);

export interface State {
    currentWeight: number;
    loadingCurrentWeight: boolean;
    currentBodyfat: number;
    loadingCurrentBodyfat: boolean;
}

const initialState: State = {
    currentWeight: 0,
    loadingCurrentWeight: false,
    currentBodyfat: 0,
    loadingCurrentBodyfat: false,
};

const dashboardReducer = createReducer(
    initialState,
    on(
        fromDashboardActions.fetchCurrentWeight,
        (state) => ({ ...state, loadingCurrentWeight: true })
    ),
    on(
        fromDashboardActions.storeCurrentWeight,
        (state, { currentWeight }) => ({ ...state, currentWeight, loadingCurrentWeight: false })
    ),
    on(
        fromDashboardActions.fetchCurrentBodyfat,
        (state) => ({ ...state, loadingCurrentBodyfat: true })
    ),
    on(
        fromDashboardActions.storeCurrentBodyfat,
        (state, { currentBodyfat }) => ({ ...state, currentBodyfat, loadingCurrentBodyfat: false })
    )
);

export function dashboardReducerFn(state: State, action: Action): State {
    return dashboardReducer(state, action);
}
