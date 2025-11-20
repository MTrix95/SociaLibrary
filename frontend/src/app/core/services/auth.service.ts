import {Injectable, signal, WritableSignal} from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../constants/auth.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {});
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  logOut() {
    this.oauthService.logOut();
  }

  isAuthenticated() {
    return this.oauthService.hasValidAccessToken();
  }

  getUserProfile() {
    return this.oauthService.getIdentityClaims() ?? null;
  }
}
