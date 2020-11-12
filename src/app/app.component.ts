import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app-auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PWRLifts';

  constructor(private readonly authService: AuthService) { }

  public ngOnInit(): void {
    this.authService.autoLogin();
  }
}
