import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { definePreset } from '@primeng/themes';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
  //Your customizations, see the following sections for examples
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: MyPreset,
            options: {
              cssLayer: {
                  name: 'primeng',
                  order: 'theme, base, primeng'
              }
          }
        }
    })
  ],
};
