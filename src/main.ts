import { bootstrapApplication } from '@angular/platform-browser';
import { register } from 'swiper/element/bundle';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
register();

// If the app was previously opened with a production service worker on localhost,
// it can keep controlling the page and cause confusing reload/caching behavior in dev.
if (location.hostname === 'localhost' && 'serviceWorker' in navigator) {
  void navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      void registration.unregister();
    }
  });

  void caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))));
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.log(err));
