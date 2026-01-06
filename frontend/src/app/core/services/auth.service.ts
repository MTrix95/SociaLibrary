import {inject, Injectable, signal} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from '../constants/auth.config';
import {UserProfile} from '../../shared/models/user-profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private oauthService: OAuthService = inject(OAuthService);

  readonly userProfile = signal<UserProfile | null>(null);

  constructor() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.refreshProfile();
    });
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  logOut() {
    this.oauthService.logOut();
    this.refreshProfile();
  }

  isAuthenticated() {
    return this.oauthService.hasValidAccessToken();
  }

  get getUserClaims() {
    return this.oauthService.getIdentityClaims() as UserProfile;
  }

  private refreshProfile() {
    if(!this.isAuthenticated()) {
      this.userProfile.set(null);
    } else {
      debugger;

      const claims = this.getUserClaims ?? null;
      this.userProfile.set(claims);
    }
  }
}
