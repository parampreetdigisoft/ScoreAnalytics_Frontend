import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoleGuard } from './core/services/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [RoleGuard],
    canLoad: [RoleGuard],
    data: { role: 'admin' }
  },
  {
    path: 'analyst',
    loadChildren: () => import('./features/analyst/analyst.module').then(m => m.AnalystModule),
    canActivate: [RoleGuard],
    canLoad: [RoleGuard],
    data: { role: 'analyst' }
  },
  {
    path: 'evaluator',
    loadChildren: () => import('./features/evaluator/evaluator.module').then(m => m.EvaluatorModule),
    canActivate: [RoleGuard],
    canLoad: [RoleGuard],
    data: { role: 'evaluator' }
  },
  {
    path: 'city-user',
    loadChildren: () => import('./features/city-user/city-user.module').then(m => m.CityUserModule),
    canActivate: [RoleGuard],
    canLoad: [RoleGuard],
    data: { role: 'city-user' }
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
