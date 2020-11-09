import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UnauthGuardService } from './auth/unauth-guard.service';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  { path: 'auth', canActivate: [ UnauthGuardService ], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'weight', loadChildren: () => import('./weight/weight.module').then(m => m.WeightModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
