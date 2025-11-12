import { Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'administrator', canActivate: [AuthGuard] }
];
