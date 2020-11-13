import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromAuth from '@app-auth/store/auth.reducer';
import * as fromUser from '@app-user/store/user.reducer';
import * as fromAuthActions from '@app-auth/store/auth.actions';

export interface State {
    auth: fromAuth.State;
    user: fromUser.State;
}

export const appReducer: ActionReducerMap<State> = {
    auth: fromAuth.authReducerFn,
    user: fromUser.userReducerFn
};

export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return (state: State, action: Action) => {
        if (action.type === fromAuthActions.logout.type) {
            console.log('CLEARING STATE');
            state = {} as State;
        }
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<any>[] = [ clearState ];
