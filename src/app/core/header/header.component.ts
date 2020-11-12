import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app-auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public collapsed = true;
  public isAuthenticated = false;

  constructor(public readonly authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authUser$.subscribe(user => this.isAuthenticated = !!user);
  }

  public onLogout(): void {
    this.authService.logout();
  }
}
