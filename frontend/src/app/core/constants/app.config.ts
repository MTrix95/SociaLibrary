import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from '../../app.routes';
import {providePrimeNG} from 'primeng/config';
import {provideOAuthClient} from 'angular-oauth2-oidc';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {errorInterceptor} from '../interceptors/error-interceptor';
import Aura from '@primeuix/themes/aura';
import {DialogService} from 'primeng/dynamicdialog';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors(
        [ errorInterceptor ]
      )
    ),
    provideOAuthClient({
        resourceServer: {
          allowedUrls: ['/api'],
          sendAccessToken: true
        }
    }),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng' // Tailwind ha la priorità su PrimeNG
          },
          darkModeSelector: false  // Disabilita darkmode
        }
      }
    })
  ]
};
