import {AuthConfig} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/socialibrary',
  clientId: 'social-library-client',
  responseType: 'code',
  scope: 'openid profile email',
  loginUrl: 'http://localhost:8080/realms/socialibrary/protocol/openid-connect/auth',
  postLogoutRedirectUri: window.location.origin + '/',
  redirectUri: window.location.origin,
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,
}
