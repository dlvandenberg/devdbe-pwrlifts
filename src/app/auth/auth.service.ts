import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Gender } from '../shared/types/gender.type';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthUser } from './auth-user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

export interface SignUpData {
  firstName: string;
  lastName?: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  gender: Gender;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey;
  private readonly loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private authUserSubject = new BehaviorSubject<AuthUser>(null);
  public authUser$ = this.authUserSubject.asObservable();

  private errorMessageSubject = new BehaviorSubject<string>(null);
  public errorMessage$ = this.errorMessageSubject.asObservable();

  private tokenExpirationTimer;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public signUp(data: SignUpData): void {
    this.loadingSubject.next(true);
    this.http.post<AuthResponseData>(this.signUpUrl, {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    }).pipe(
      map(responseData => this.handleAuthentication(responseData)),
      catchError(errorResponse => this.handleError(errorResponse))
    ).subscribe(
      _ => {
        this.router.navigate(['/']);
        this.loadingSubject.next(false);
        this.errorMessageSubject.next(null);
      },
      errorMessage => {
        this.errorMessageSubject.next(errorMessage);
        this.loadingSubject.next(false);
      });
  }

  public login(email: string, password: string): void {
    this.loadingSubject.next(true);
    this.http.post<AuthResponseData>(this.loginUrl, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      tap(_ => console.log('succesful login')),
      map(responseData => this.handleAuthentication(responseData)),
      catchError(errorResponse => this.handleError(errorResponse))
    ).subscribe(
      _ => {
        this.router.navigate(['/']);
        this.loadingSubject.next(false);
        this.errorMessageSubject.next(null);
      },
      errorMessage => {
        this.errorMessageSubject.next(errorMessage);
        this.loadingSubject.next(false);
      });
  }

  private handleAuthentication(responseData: AuthResponseData): AuthUser {
    const expiresInMs = +responseData.expiresIn * 1000;
    const expirationDate = new Date(new Date().getTime() + expiresInMs);
    const authUser = new AuthUser(
      responseData.localId,
      responseData.email,
      responseData.idToken,
      expirationDate,
      responseData.refreshToken
    );
    this.authUserSubject.next(authUser);
    localStorage.setItem('userData', JSON.stringify(authUser));
    this.autoLogout(expiresInMs);
    return authUser;
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid credentials';
        break;
    }
    return throwError(errorMessage);
  }

  public clearError(): void {
    this.errorMessageSubject.next(null);
  }

  public logout(): void {
    this.authUserSubject.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['']);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  public autoLogin(): void {
    const parsedUser: {
      id: string,
      email: string,
      token: string,
      expirationDate: string,
      refreshToken: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (parsedUser) {
      const authUser = new AuthUser(
        parsedUser.id,
        parsedUser.email,
        parsedUser.token,
        new Date(parsedUser.expirationDate),
        parsedUser.refreshToken
      );
      if (authUser.getToken()) {
        this.authUserSubject.next(authUser);
      }
    }
  }

  public autoLogout(expiresInMs: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expiresInMs);
  }
}
