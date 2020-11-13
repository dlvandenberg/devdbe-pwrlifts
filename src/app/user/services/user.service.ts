import { Injectable } from '@angular/core';
import { IUser } from '@app-user/model/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromUserActions from '../store/user.actions';
import * as fromUser from '../store/user.reducer';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private readonly store: Store) { }

    public fetchUser(id: string): void {
        this.store.dispatch(fromUserActions.fetchUser({ id }));
    }

    public updateUser(user: IUser): void {
        this.store.dispatch(fromUserActions.updateUser({ ...user }));
    }

    public handleError(): void {
        this.store.dispatch(fromUserActions.clearError());
    }

    get user$(): Observable<IUser> {
        return this.store.select(fromUser.selectState).pipe(
            map(state => state.user)
        );
    }

    get loading$(): Observable<boolean> {
        return this.store.select(fromUser.selectState).pipe(
            map(state => state.savingChanges)
        );
    }

    get saved$(): Observable<boolean> {
        return this.store.select(fromUser.selectState).pipe(
            map(state => state.changesSaved)
        );
    }

    get error$(): Observable<string> {
        return this.store.select(fromUser.selectState).pipe(
            map(state => state.userError)
        );
    }

}
