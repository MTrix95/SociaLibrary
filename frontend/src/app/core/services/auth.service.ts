import { Injectable } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from '../constants/auth.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
  }


  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  isAuthenticated() {
    return this.oauthService.hasValidAccessToken();
  }

  getUserProfile() {
    return this.oauthService.getIdentityClaims();
  }
}
