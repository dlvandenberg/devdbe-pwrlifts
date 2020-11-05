import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

export class AuthGuardService implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.authUser$
            .pipe(
                take(1),
                map(user => !!user ? true : this.router.createUrlTree(['/auth']))
            );
    }

}
