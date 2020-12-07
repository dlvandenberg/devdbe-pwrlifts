import { TestBed } from '@angular/core/testing';
import { AuthUser } from '@app-auth/model/auth-user.model';
import { Gender } from '@app-types/gender.enum';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromAuthActions from '@app-auth/store/auth.actions';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const storeMock: Partial<Store> = {
    dispatch(): void {},
    select(): Observable<any> {
      return of(null);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: storeMock }],
    });
    const store = TestBed.inject(Store);
    service = new AuthService(store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return authUser', async () => {
    // Given
    spyOn(storeMock, 'select').and.returnValue(
      of({
        authUser: new AuthUser('0', 'test@mail.nl', '---', '///', new Date(), true),
        authError: 'someError',
        loading: false,
      })
    );

    // When
    await service.authUser$.subscribe((user) => {
      expect(user.id).toEqual('0');
      expect(user.email).toEqual('test@mail.nl');
      expect(user.refreshToken).toEqual('///');
    });
  });

  it('should return error', async () => {
    // Given
    spyOn(storeMock, 'select').and.returnValue(
      of({
        authUser: new AuthUser('0', 'test@mail.nl', '---', '///', new Date(), true),
        authError: 'someError',
        loading: false,
      })
    );

    // When
    await service.error$.subscribe((error) => {
      expect(error).toEqual('someError');
    });
  });

  it('should return loading', async () => {
    // Given
    spyOn(storeMock, 'select').and.returnValue(
      of({
        authUser: new AuthUser('0', 'test@mail.nl', '---', '///', new Date(), true),
        authError: 'someError',
        loading: true,
      })
    );

    // When
    await service.loading$.subscribe((loading) => {
      expect(loading).toBeTrue();
    });
  });

  it('should call signUpStart', () => {
    // Given
    const spy = spyOn(storeMock, 'dispatch');

    // When
    service.signUp({
      firstName: 'Dennis',
      lastName: 'van den Berg',
      gender: Gender.MALE,
      email: 'dennis@somemail.nl',
      password: 'apass',
      dateOfBirth: new Date('1989-10-14'),
    });

    // Then
    expect(spy).toHaveBeenCalledWith(
      fromAuthActions.signUpStart({
        firstName: 'Dennis',
        lastName: 'van den Berg',
        gender: Gender.MALE,
        email: 'dennis@somemail.nl',
        password: 'apass',
        dateOfBirth: new Date('1989-10-14'),
      })
    );
  });

  it('should call loginStart', () => {
    // Given
    const spy = spyOn(storeMock, 'dispatch');

    // When
    service.login('dennis@somemail.nl', 'apass', true);

    // Then
    expect(spy).toHaveBeenCalledWith(
      fromAuthActions.loginStart({
        email: 'dennis@somemail.nl',
        password: 'apass',
        rememberMe: true
      })
    );
  });

  it('should call clearError', () => {
    // Given
    const spy = spyOn(storeMock, 'dispatch');

    // When
    service.handleError();

    // Then
    expect(spy).toHaveBeenCalledWith(fromAuthActions.clearError());
  });

  it('should call logout', () => {
    // Given
    const spy = spyOn(storeMock, 'dispatch');

    // When
    service.logout();

    // Then
    expect(spy).toHaveBeenCalledWith(fromAuthActions.logout());
  });

  it('should call autoLogin', () => {
    // Given
    const spy = spyOn(storeMock, 'dispatch');

    // When
    service.autoLogin();

    // Then
    expect(spy).toHaveBeenCalledWith(fromAuthActions.autoLogin());
  });

  describe('logout timer', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should set logout timer', async () => {
      // Given
      const spy = spyOn(storeMock, 'dispatch');

      // When
      service.setTokenExpireTimer(1000, fromAuthActions.logout());
      jasmine.clock().tick(1000);

      // Then
      await setTimeout(() => {
        expect(spy).toHaveBeenCalledWith(fromAuthActions.logout());
      }, 20);
    });

    it('should clear logout timer', async () => {
      // Given
      const spy = spyOn(storeMock, 'dispatch');

      // When
      service.setTokenExpireTimer(1000, fromAuthActions.logout());
      jasmine.clock().tick(500);
      service.clearLogoutTimer();
      jasmine.clock().tick(1000);

      // Then
      expect(spy).not.toHaveBeenCalledWith(fromAuthActions.logout());
    });
  });
});
