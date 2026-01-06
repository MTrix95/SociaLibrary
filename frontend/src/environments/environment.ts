export const environment = {
  production: true,
  // KEYCLOAK
  KC_URL_SERVER: window.location.origin + '/realms/socialibrary',
  KC_URL_AUTH: window.location.origin + '/realms/socialibrary/protocol/openid-connect/auth',
  KC_CLIENT_ID: 'social-library-client',
  KC_RESPONSE_TYPE: 'code',
  KC_SCOPE: 'openid profile email',
  AUTH_DEBUG_INFORMATION: false,
  SKIP_ISSUER_CHECK: false,

  GATEWAY_API_URL: '/api'
};
