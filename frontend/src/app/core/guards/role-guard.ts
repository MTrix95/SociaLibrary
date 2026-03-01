import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router, RouterStateSnapshot, UrlTree,
} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

/**
 * RoleGuard - Controllo degli accessi basato sui ruoli.
 *
 * Estende la sicurezza dell'applicazione verificando che l'utente autenticato
 * possieda i permessi necessari per accedere a specifiche aree.
 * In caso di permessi insufficienti, l'utente viene reindirizzato alla pagina principale.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    private authService = inject(AuthService);
    private router = inject(Router);

  /**
   * Gestisce l'attivazione del guard in base al ruolo dell'utente
   * @param route
   * @param state
   */
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const expectedRoles: string[] = route.data["roles"] ?? [];
        const userRoles = this.authService.userProfile()?.roles as string[];

        if(expectedRoles.every(role => userRoles.includes(role))) {
            return true;
        }

        // Nel caso il cui l'utente non ha il ruolo neccessario viene reindirizzato alla home
        await this.router.navigate(['/home']);
        return false;
    }
}
