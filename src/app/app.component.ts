import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app-auth/services/auth.service';
import { AppUpdateService } from '@app-shared/services/app-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly appUpdateService: AppUpdateService,
    private readonly authService: AuthService) { }

  public ngOnInit(): void {
    this.authService.autoLogin();
  }
}
