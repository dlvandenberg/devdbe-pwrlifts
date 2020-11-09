import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UnauthGuardService implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.authUser$
            .pipe(
                take(1),
                switchMap(user => {
                    if (!user) {
                        this.authService.autoLogin();
                        return this.authService.authUser$.pipe(
                            take(1),
                            map(authUser => !authUser ? true : this.router.createUrlTree(['user']))
                        );
                    } else {
                        return of(this.router.createUrlTree(['user']));
                    }
                })
            );
    }

}
