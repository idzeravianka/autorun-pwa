import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PormptComponent } from './core/components/pormpt/pormpt.component';
import { customNotifierOptions } from './core/configs/notification-config';
import { PwaPromptService } from './core/services/pwa-prompt.service';
import { HeaderModule } from './modules/header/header.module';

const initializer = (pwaService: PwaPromptService) => () => pwaService.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
    PormptComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderModule,
    NotifierModule.withConfig(customNotifierOptions),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaPromptService], multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
