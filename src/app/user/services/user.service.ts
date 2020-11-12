import { Injectable } from '@angular/core';
import { User } from '@app-user/model/user.model';
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

    get user$(): Observable<User> {
        return this.store.select(fromUser.selectState).pipe(
            map(state => state.user)
        );
    }
}
