export const environment = {
  // AUTH CONFIGURATION
  KC_URL_SERVER: 'http://keycloak:8080/realms/social-library',
  KC_URL_AUTH: 'http://keycloak:8080/realms/social-library/protocol/openid-connect/auth',
  KC_CLIENT_ID: 'social-library-client',
  KC_RESPONSE_TYPE: 'code',
  KC_SCOPE: 'openid profile email',
  AUTH_DEBUG_INFORMATION: false,

  GATEWAY_API_URL: 'http://gateway:8083/social-library/api'
};
