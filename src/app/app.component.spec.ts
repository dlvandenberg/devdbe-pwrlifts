import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app-auth/services/auth.service';
import { AppUpdateService } from '@app-shared/services/app-update.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const authServiceMock: Partial<AuthService> = {};
  const appUpdateServiceMock: Partial<AppUpdateService> = {};
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: AppUpdateService, useValue: appUpdateServiceMock }
      ]
    }).compileComponents();

    const authService = TestBed.inject(AuthService);
    const appUpdateService = TestBed.inject(AppUpdateService);
    component = new AppComponent(appUpdateService, authService);
  });

  it('should create the app', () => {
    expect(component).toBeDefined();
  });
});
