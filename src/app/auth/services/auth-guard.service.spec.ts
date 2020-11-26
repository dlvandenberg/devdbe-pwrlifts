import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthUser } from '@app-auth/model/auth-user.model';
import { Observable, of } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

describe('AuthGuardService', () => {
  let guard: AuthGuardService;
  const authServiceMock: Partial<AuthService> = {
    get authUser$(): Observable<AuthUser> {
      return of<AuthUser>();
    },
    autoLogin(): void { },
  };
  const routerMock: Partial<Router> = {
    createUrlTree(commands: any[]): UrlTree {
      return new UrlTree();
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);
    guard = new AuthGuardService(authService, router);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when an user is authenticated', async () => {
    // given
    const spy = spyOnProperty(
      authServiceMock,
      'authUser$',
      'get'
    ).and.returnValue(
      of(new AuthUser('0', 'test@mail.nl', '---', '///', new Date()))
    );

    // When
    const result = guard.canActivate(null, null); // arguments are not used

    // Then
    expect(result instanceof Observable).toBeTrue();
    await (result as Observable<boolean>).subscribe((obsResult) =>
      expect(obsResult).toBeTrue()
    );
  });

  it('should try to autologin when no user is authenticated yet, and return true when autologin succeeds', async () => {
    // given
    const spy = spyOnProperty(
      authServiceMock,
      'authUser$',
      'get'
    ).and.returnValues(of(undefined));
    const autoLoginSpy = spyOn(authServiceMock, 'autoLogin').and.callFake(
      () => {
        spy.and.returnValue(
          of(new AuthUser('0', 'test@mail.nl', '---', '///', new Date()))
        );
      }
    );

    // When
    const result = await guard.canActivate(null, null); // arguments are not used

    // Then
    expect(result instanceof Observable).toBeTrue();
    await (result as Observable<boolean>).subscribe((obsResult) =>
      expect(obsResult).toBeTrue()
    );
  });

  it('should try to autologin when no user is authenticated yet, and redirect to /auth when autologin fails', async () => {
    // given
    const spy = spyOnProperty(
      authServiceMock,
      'authUser$',
      'get'
    ).and.returnValues(of(undefined));
    const autoLoginSpy = spyOn(authServiceMock, 'autoLogin').and.callFake(
      () => {
        spy.and.returnValue(of(null));
      }
    );
    const routerSpy = spyOn(routerMock, 'createUrlTree').and.callThrough();

    // When
    const result = await guard.canActivate(null, null); // arguments are not used

    // Then
    expect(result instanceof Observable).toBeTrue();
    await (result as Observable<UrlTree>).subscribe(obsResult => {
        expect(obsResult instanceof UrlTree).toBeTrue();
        expect(routerSpy).toHaveBeenCalledWith(['/auth']);
    });
  });
});
