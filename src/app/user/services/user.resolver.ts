import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { exhaustMap, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../model/user.model';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
        return this.userService.user$
            .pipe(
                take(1),
                exhaustMap(user => {
                    if (!user) {
                        return this.authService.authUser$
                            .pipe(
                                take(1),
                                switchMap(authUser => this.userService.getUser(authUser.id))
                            );
                    } else {
                        return of(user);
                    }
                })
            );
    }
}
