import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from '../constants/auth.config';
import {UserProfile} from '../../shared/models/user-profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private oauthService: OAuthService = inject(OAuthService);

  userProfile: WritableSignal<UserProfile | null> = signal(null);
  isLoggedIn: WritableSignal<boolean | false> = signal(false);

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

  get getUserClaims(): UserProfile {
    return this.oauthService.getIdentityClaims() as UserProfile;
  }

  get isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  private refreshProfile() {
    const loggedIn = this.isAuthenticated;
    this.isLoggedIn.set(loggedIn);
    if(!loggedIn) {
      this.userProfile.set(null);
    } else {
      const claims = this.getUserClaims ?? null;
      this.userProfile.set(claims);
    }
  }
}
