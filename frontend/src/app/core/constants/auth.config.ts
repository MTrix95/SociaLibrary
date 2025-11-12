import {AuthConfig} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8080/auth/realms/socialibrary',
  clientId: 'social-library-client',
  responseType: 'code',
  scope: 'openid profile email',
  postLogoutRedirectUri: window.location.origin + '/index.html',
  redirectUri: window.location.origin + '/index.html',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,
}
