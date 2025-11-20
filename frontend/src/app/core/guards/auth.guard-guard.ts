import {inject, Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private readonly authService = inject(AuthService);

  canActivate(): boolean {
    if(this.authService.isAuthenticated()) {
      return true;
    }

    this.authService.login();
    return false;
  }
}
