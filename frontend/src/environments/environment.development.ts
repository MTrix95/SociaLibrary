export const environment = {
  production: false,
  // KEYCLOAK
  KC_URL_SERVER: window.location.origin + '/realms/socialibrary',
  KC_URL_AUTH: window.location.origin + '/realms/socialibrary/protocol/openid-connect/auth',
  KC_CLIENT_ID: 'social-library-client',
  KC_RESPONSE_TYPE: 'code',
  KC_SCOPE: 'openid profile email',
  AUTH_DEBUG_INFORMATION: true,
  SKIP_ISSUER_CHECK: true,

  GATEWAY_API_URL: '/api',
  GEOSERVER_API_URL: '/geo',

  /**
   * ==============================================
   *                COSTANTI MAPPA
   * ==============================================
   */
  MAP_DEFAULT_CENTER: [16.871871, 41.117143],
  MAP_DEFAULT_ZOOM: 13,

  MAP_USER_POSITION_STYLE: {
    radius: 6,
    fillColor: '#3399CC',
    strokeColor: '#fff',
    strokeWidth: 2,
  },

  MAP_LIBRARY_WMS_URL: '/geo/ows',
  MAP_LIBRARY_WMS_PARAMS: {
    SERVICE: 'WMS',
    VERSION: '1.1.1',
    REQUEST: 'GetMap',
    LAYERS: 'SociaLibrary:books',
    TILED: true,
    FORMAT: 'image/png',
    TRANSPARENT: true,
  }
};
