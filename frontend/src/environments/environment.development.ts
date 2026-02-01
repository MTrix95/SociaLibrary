export const environment = {
  production: false,
  // KEYCLOAK
  KC_URL_SERVER: 'http://localhost:8080/realms/socialibrary/',
  KC_URL_AUTH: 'http://localhost:8080/realms/socialibrary/protocol/openid-connect/auth',
  KC_CLIENT_ID: 'social-library-client',
  KC_RESPONSE_TYPE: 'code',
  KC_SCOPE: 'openid profile email',
  AUTH_DEBUG_INFORMATION: true,
  SKIP_ISSUER_CHECK: true,

  GATEWAY_API_URL: '/api'
};
