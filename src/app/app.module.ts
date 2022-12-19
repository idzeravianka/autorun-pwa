import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PormptComponent } from './core/components/pormpt/pormpt.component';
import { customNotifierOptions } from './core/configs/notification-config';
import { PwaPromptService } from './core/services/pwa-prompt.service';
import { HeaderModule } from './header/header.module';

const initializer = (pwaService: PwaPromptService) => () => pwaService.initPwaPrompt();

@NgModule({
  declarations: [AppComponent, PormptComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    NotifierModule.withConfig(customNotifierOptions),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    HeaderModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaPromptService], multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
