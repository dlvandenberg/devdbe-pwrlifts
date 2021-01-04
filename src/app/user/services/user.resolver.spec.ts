import { TestBed } from '@angular/core/testing';
import { AuthUser } from '@app-auth/model/auth-user.model';
import { AuthService } from '@app-auth/services/auth.service';
import { Gender } from '@app-types/gender.enum';
import { User } from '@app-user/model/user.model';
import { Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import * as fromUserActions from '@app-user/store/user.actions';

describe('UserResolver', () => {
  let resolver: UserResolver;
  const authServiceMock: Partial<AuthService> = {
      get authUser$(): Observable<AuthUser> {
          return of<AuthUser>(null);
      }
  };
  const userServiceMock: Partial<UserService> = {
      get user$(): Observable<User> {
          return of<User>(null);
      },
      fetchUser(id: string): void {}
  };
  const actions$Mock: Partial<Actions> = of(fromUserActions.fetchUser({ id: '0'}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: Actions, useValue: actions$Mock },
      ],
    }).compileComponents();

    const authService = TestBed.inject(AuthService);
    const userService = TestBed.inject(UserService);
    const actions$ = TestBed.inject(Actions);
    resolver = new UserResolver(authService, userService, actions$);
  });

  it('should create', () => {
    expect(resolver).toBeDefined();
  });

  it('should return true when a user exists in the state', async () => {
    spyOnProperty(userServiceMock, 'user$').and.returnValue(
        of<User>({
            id: '0',
            firstName: 'Dennis',
            lastName: 'van den Berg',
            dateOfBirth: new Date('1989-10-14 00:00:00'),
            email: 'dennis@devd.be',
            gender: Gender.MALE
        })
    );

    const result = await resolver.resolve(null, null);
    expect(result instanceof Observable);
    await (result as Observable<boolean>).subscribe(userExists => expect(userExists).toBeTrue());
  });
});
