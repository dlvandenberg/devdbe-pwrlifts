import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UnauthGuardService } from './auth/services/unauth-guard.service';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  { path: 'auth', canActivate: [ UnauthGuardService ], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'weight', loadChildren: () => import('./weight/weight.module').then(m => m.WeightModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'body', loadChildren: () => import('./body-measurement/body-measurement.module').then(m => m.BodyMeasurementModule) },
  { path: '1rm', loadChildren: () => import('./one-rep-max/one-rep-max.module').then(m => m.OneRepMaxModule) },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
