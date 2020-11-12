import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '@app-auth/store/auth.reducer';
import * as fromUser from '@app-user/store/user.reducer';

export interface State {
    auth: fromAuth.State;
    user: fromUser.State;
}

export const appReducer: ActionReducerMap<State> = {
    auth: fromAuth.authReducerFn,
    user: fromUser.userReducerFn
};
