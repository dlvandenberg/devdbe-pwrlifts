import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { UserResolver } from './services/user.resolver';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ AuthGuardService ],
    resolve: { user: UserResolver },
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
