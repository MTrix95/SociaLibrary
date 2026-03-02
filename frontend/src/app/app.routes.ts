import { Routes } from '@angular/router';
import {MapComponent} from './shared/components/map/map.component';
import {AuthGuard} from './core/guards/auth-guard';
import {StatsComponent} from './features/admin/settings/stats/stats.component';
import {RoleGuard} from './core/guards/role-guard';
import {StatsUserComponent} from './features/user/settings/stats/stats-user.component';

export const routes: Routes = [
  { path: 'home', component: MapComponent},
  // ROTTE PER USER
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: StatsUserComponent },
    ]
  },
  // ROTTE AMMINISTRATORE
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: 'dashboard', component: StatsComponent }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
