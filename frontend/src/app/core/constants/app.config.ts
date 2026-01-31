import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from '../../app.routes';
import {providePrimeNG} from 'primeng/config';
import {DefaultOAuthInterceptor, provideOAuthClient} from 'angular-oauth2-oidc';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {errorInterceptor} from '../interceptors/error-interceptor';
import Aura from '@primeuix/themes/aura';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([errorInterceptor]),
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultOAuthInterceptor,
      multi: true
    },
    provideOAuthClient({
        resourceServer: {
          allowedUrls: ['http://localhost:4200/api', '/api'],
          sendAccessToken: true
        }
    }),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          },
          darkModeSelector: false
        }
      }
    })
  ]
};
