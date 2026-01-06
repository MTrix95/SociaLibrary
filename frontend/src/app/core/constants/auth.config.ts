import {AuthConfig} from 'angular-oauth2-oidc';
import {environment} from '../../../environments/environment';

export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.KC_URL_SERVER,
  clientId: environment.KC_CLIENT_ID,
  responseType: environment.KC_RESPONSE_TYPE,
  scope: environment.KC_SCOPE,
  loginUrl: environment.KC_URL_AUTH,
  postLogoutRedirectUri: window.location.origin + '/',
  redirectUri: window.location.origin,
  showDebugInformation: environment.AUTH_DEBUG_INFORMATION,
  strictDiscoveryDocumentValidation: false,
  requireHttps: false,
  skipIssuerCheck: environment.SKIP_ISSUER_CHECK
}
