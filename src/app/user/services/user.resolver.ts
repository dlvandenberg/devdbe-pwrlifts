import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { exhaustMap, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from '@app-auth/services/auth.service';
import { User } from '../model/user.model';
import { UserService } from './user.service';
import * as fromUserActions from '../store/user.actions';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly actions$: Actions
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
        return this.userService.user$
            .pipe(
                take(1),
                exhaustMap(user => {
                    if (!user) {
                        return this.authService.authUser$.pipe(
                            take(1),
                            map(authUser => authUser.id),
                            switchMap(id => {
                                this.userService.fetchUser(id);
                                return this.actions$.pipe(
                                    ofType(fromUserActions.storeUser),
                                    take(1)
                                );
                            })
                        );
                    } else {
                        return of(user);
                    }
                })
            );
    }
}
