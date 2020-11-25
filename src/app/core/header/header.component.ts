import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app-auth/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { DestroyObservable } from '@app-shared/destroy.observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [ DestroyObservable ]
})
export class HeaderComponent implements OnInit {
  public collapsed = true;
  public isAuthenticated = false;

  constructor(
    private readonly destroy$: DestroyObservable,
    public readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.authUser$.pipe(takeUntil(this.destroy$)).subscribe(user => this.isAuthenticated = !!user);
  }

  public onLogout(): void {
    this.authService.logout();
  }
}
