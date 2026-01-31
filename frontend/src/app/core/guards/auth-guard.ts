import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject, Injectable} from '@angular/core';

/**
 * AuthGuard - Protezione delle rotte basata sull'autenticazione.
 *
 * Garantisce che l'utente sia autenticato prima di accedere a una rotta.
 * Se l'utente non possiede un token valido (verificato tramite AuthService), viene
 * attivato automaticamente il flusso di login.
 */
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
