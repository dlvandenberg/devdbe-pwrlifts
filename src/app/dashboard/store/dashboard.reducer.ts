import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as fromDashboardActions from './dashboard.actions';

export const featureKey = 'dashboard';
export const selectState = createFeatureSelector<State>(featureKey);

export interface State {
    currentWeight: number;
    loadingWeight: boolean;
    currentBodyfat: number;
    loadingBodyfat: boolean;
    currentSquat: number;
    loadingSquat: boolean;
    currentBenchpress: number;
    loadingBenchpress: boolean;
    currentDeadlift: number;
    loadingDeadlift: boolean;
}

const initialState: State = {
    currentWeight: 0,
    loadingWeight: false,
    currentBodyfat: 0,
    loadingBodyfat: false,
    currentSquat: 0,
    loadingSquat: false,
    currentBenchpress: 0,
    loadingBenchpress: false,
    currentDeadlift: 0,
    loadingDeadlift: false
};

const dashboardReducer = createReducer(
    initialState,
    on(
        fromDashboardActions.fetchCurrent,
        (state, { dashboardType }) => {
            const property = 'loading' + dashboardType.name;
            return ({ ...state, [property]: true });
        }
    ),
    on(
        fromDashboardActions.storeCurrent,
        (state, { dashboardType, current }) => {
            const currentProperty = 'current' + dashboardType.name;
            const loadingProperty = 'loading' + dashboardType.name;
            return ({ ...state, [currentProperty]: current, [loadingProperty]: false });
        }
    )
);

export function dashboardReducerFn(state: State, action: Action): State {
    return dashboardReducer(state, action);
}
