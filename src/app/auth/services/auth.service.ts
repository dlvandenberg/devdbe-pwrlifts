import { Injectable } from '@angular/core';
import { Gender } from '@app-types/gender.enum';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromAuthActions from '@app-auth/store/auth.actions';
import * as fromAuth from '@app-auth/store/auth.reducer';
import { map } from 'rxjs/operators';
import { AuthUser } from '@app-auth/model/auth-user.model';

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
  private tokenExpirationTimer;

  constructor(
    private store: Store
  ) { }

  get authUser$(): Observable<AuthUser> {
    return this.store.select(fromAuth.selectState).pipe(
      map(state => state.authUser)
    );
  }

  get error$(): Observable<string> {
    return this.store.select(fromAuth.selectState).pipe(
      map(state => state.authError)
    );
  }

  get loading$(): Observable<boolean> {
    return this.store.select(fromAuth.selectState).pipe(
      map(state => state.loading)
    );
  }

  public signUp(data: SignUpData): void {
    this.store.dispatch(fromAuthActions.signUpStart(data));
  }

  public login(email: string, password: string): void {
    this.store.dispatch(fromAuthActions.loginStart({ email, password }));
  }

  public handleError(): void {
    this.store.dispatch(fromAuthActions.clearError());
  }

  public logout(): void {
    this.store.dispatch(fromAuthActions.logout());
  }

  public autoLogin(): void {
    this.store.dispatch(fromAuthActions.autoLogin());
  }

  public setLogoutTimer(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  public clearLogoutTimer(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
