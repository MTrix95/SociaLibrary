import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

/**
 * RoleGuard - Controllo degli accessi basato sui ruoli.
 *
 * Estende la sicurezza dell'applicazione verificando che l'utente autenticato
 * possieda i permessi necessari (es. ROLE_ADMIN) per accedere a specifiche aree.
 * In caso di permessi insufficienti, l'utente viene reindirizzato alla pagina principale.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    private authService = inject(AuthService);
    private router = inject(Router);

    canActivate(): boolean {
        // TODO: Aggiungere la gestione dei ruoli

        // Nel caso il cui l'utente non ha il ruolo neccessario viene reindirizzato alla home
        this.router.navigate(['/home']).then(r => {});
        return false;
    }
}
