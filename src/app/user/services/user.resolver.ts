import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from '@app-auth/services/auth.service';
import { UserService } from './user.service';
import * as fromUserActions from '../store/user.actions';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly actions$: Actions
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.userService.user$
            .pipe(
                take(1),
                exhaustMap(user => {
                    if (!user) {
                        return this.authService.authUser$.pipe(
                            take(1),
                            map(authUser => authUser.id),
                            exhaustMap(id => {
                                this.userService.fetchUser(id);
                                return this.actions$.pipe(
                                    ofType(fromUserActions.storeUser),
                                    take(1),
                                    map(_ => true)
                                );
                            })
                        );
                    } else {
                        return of(true);
                    }
                })
            );
    }
}
