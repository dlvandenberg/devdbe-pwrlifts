import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthUser } from '@app-auth/model/auth-user.model';
import { Observable, of } from 'rxjs';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from './auth.service';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptorService;
  const authServiceMock: Partial<AuthService> = {
    get authUser$(): Observable<AuthUser> {
      return of<AuthUser>();
    },
  };
  const handlerMock: Partial<HttpHandler> = {
      handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
          actualReq = req;
          return of(null);
    }
  };
  let actualReq: HttpRequest<any>;
  let handler: HttpHandler;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: HttpHandler, useValue: handlerMock }
      ],
    });

    const authService = TestBed.inject(AuthService);
    handler = TestBed.inject(HttpHandler);
    interceptor = new AuthInterceptorService(authService);
  });

  it('should create', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should not modify the request when no user is authenticated', async () => {
    // Given
    spyOnProperty(authServiceMock, 'authUser$', 'get').and.returnValue(of(null));
    const handlerSpy = spyOn(handler, 'handle').and.callThrough();
    const req = new HttpRequest('GET', 'url');

    // When
    const result = await interceptor.intercept(req, handler);

    // Then
    await result.subscribe(() => {
        expect(handlerSpy).toHaveBeenCalled();
        expect(actualReq.method).toEqual('GET');
        expect(actualReq.url).toEqual('url');
        expect(actualReq.params.get('auth')).toBeFalsy();
    });
  });

  it('should add the auth token on the request when a user is authenticated', async () => {
    // Given
    spyOnProperty(authServiceMock, 'authUser$', 'get').and.returnValue(of(new AuthUser(
        '0',
        'test@mail.nl',
        '---',
        '///',
        new Date(new Date().getTime() + 100000),
        true
    )));
    const handlerSpy = spyOn(handler, 'handle').and.callThrough();
    const req = new HttpRequest('GET', 'url');

    // When
    const result = await interceptor.intercept(req, handler);

    // Then
    await result.subscribe(() => {
        expect(handlerSpy).toHaveBeenCalled();
        expect(actualReq.method).toEqual('GET');
        expect(actualReq.url).toEqual('url');
        expect(actualReq.params.get('auth')).toEqual('---');
    });
  });
});
