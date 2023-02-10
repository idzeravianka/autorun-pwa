import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NotifierModule } from 'angular-notifier';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewVersionPromptComponent } from './core/components/new-version-prompt/new-version-prompt.component';
import { PormptComponent } from './core/components/pormpt/pormpt.component';
import { customNotifierOptions } from './core/configs/notification-config';
import { PwaPromptService } from './core/services/pwa-prompt.service';
import { HeaderModule } from './header/header.module';

export const WINDOW_OBJECT = new InjectionToken<string>('WindowObject');

const initializer = (pwaService: PwaPromptService) => () => pwaService.initPwaPrompt();

@NgModule({
  declarations: [AppComponent, PormptComponent, NewVersionPromptComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NgCircleProgressModule.forRoot({}),
    HeaderModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaPromptService], multi: true },
    { provide: WINDOW_OBJECT, useValue: window },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
