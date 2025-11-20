import { Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard-guard';
import {Administrator} from './components/administrator/administrator';
import {User} from './components/user/user';
import {Dashboard} from './shared/dashboard/dashboard';
import {App} from './app';
import {MapComponent} from './shared/map/map';


export const routes: Routes = [
  { path: 'home', component:  MapComponent},
  { path: 'user', component: User, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard/:id', component: Dashboard }
    ]
  },
  { path: 'administrator', component: Administrator, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard/id', component: Dashboard }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
