import { TestBed } from '@angular/core/testing';
import { AuthUser } from '@app-auth/model/auth-user.model';
import { AuthService } from '@app-auth/services/auth.service';
import { DestroyObservable } from '@app-shared/destroy.observable';
import { Observable, of } from 'rxjs';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  const authServiceMock: Partial<AuthService> = {
    get authUser$(): Observable<AuthUser> {
      return of();
    },
    logout(): void {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ DestroyObservable, { provide: AuthService, useValue: authServiceMock } ]
    }).compileComponents();

    const destroyObs = TestBed.inject(DestroyObservable);
    const authService = TestBed.inject(AuthService);

    component = new HeaderComponent(destroyObs, authService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check if an user is authenticated', () => {
    it('should set authenticated to false when no user is logged in', () => {
      spyOnProperty(authServiceMock, 'authUser$').and.returnValue(of<AuthUser>(null));

      // When header component is initialized
      component.ngOnInit();

      expect(component.isAuthenticated).toBeFalse();
    });

    it('should set authenticated to true when no user is logged in', () => {
      spyOnProperty(authServiceMock, 'authUser$').and.returnValue(of<AuthUser>(new AuthUser(
        '0',
        'test@mail.nl',
        '---',
        '///',
        new Date()
      )));

      // When header component is initialized
      component.ngOnInit();

      expect(component.isAuthenticated).toBeTrue();
    });
  });

  it('should inform the authService to logout when logout method is called', () => {
    const spy = spyOn(authServiceMock, 'logout');

    component.onLogout();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
