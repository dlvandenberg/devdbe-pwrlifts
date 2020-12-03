import { TestBed } from '@angular/core/testing';
import { DestroyObservable } from '@app-shared/destroy.observable';
import { Observable, of } from 'rxjs';
import { User } from './model/user.model';
import { UserService } from './services/user.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  const userServiceMock: Partial<UserService> = {
    get user$(): Observable<User> {
      return of<User>(null);
    },
    updateUser(user: User): void {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DestroyObservable,
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    const destroy$ = TestBed.inject(DestroyObservable);
    const userService = TestBed.inject(UserService);
    component = new UserComponent(destroy$, userService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
