export const environment = {
  production: false,
  // KEYCLOAK
  KC_URL_SERVER: 'http://localhost:8080/realms/social-library',
  KC_URL_AUTH: 'http://localhost:8080/realms/social-library/protocol/openid-connect/auth',
  KC_CLIENT_ID: 'social-library-client',
  KC_RESPONSE_TYPE: 'code',
  KC_SCOPE: 'openid profile email',
  AUTH_DEBUG_INFORMATION: true,

  GATEWAY_API_URL: 'http://localhost:8080/social-library/api'
};
