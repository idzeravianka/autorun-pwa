import {
  ApplicationConfig,
  inject,
  InjectionToken,
  isDevMode,
  provideAppInitializer,
} from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideIonicAngular, IonicRouteStrategy } from '@ionic/angular/standalone';

import { routes } from './app.routes';
import { PwaPromptService } from './core/services/pwa-prompt.service';

export const WINDOW_OBJECT = new InjectionToken<Window>('WindowObject');

const initializePWAPrompt = () => {
  const pwaService = inject(PwaPromptService);
  pwaService.initPwaPrompt();
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonicAngular(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: WINDOW_OBJECT, useValue: window },
    provideAppInitializer(initializePWAPrompt),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
