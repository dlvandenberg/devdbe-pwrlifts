import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UnauthGuardService } from './auth/unauth-guard.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'auth', canActivate: [ UnauthGuardService ], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'weight', loadChildren: () => import('./weight/weight.module').then(m => m.WeightModule) },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
