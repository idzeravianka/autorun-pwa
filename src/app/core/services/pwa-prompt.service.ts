import { inject, Injectable } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular/standalone';
import { Subject, switchMap, take, timer } from 'rxjs';

import { PormptComponent } from '../components/pormpt/pormpt.component';

@Injectable({
  providedIn: 'root',
})
export class PwaPromptService {
  private promptEvent: Event;
  private dismiss$: Subject<void> = new Subject<void>();
  private modalController: ModalController = inject(ModalController);
  private platform: Platform = inject(Platform);

  public initPwaPrompt() {
    if (this.platform.is('android')) {
      window.addEventListener('beforeinstallprompt', (event: Event) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.is('ios')) {
      const isInStandaloneMode = 'standalone' in window.navigator && window.navigator.standalone;
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android'): void {
    const debounce = 3000;
    timer(debounce)
      .pipe(
        take(1),
        switchMap(async () => {
          const modal = await this.modalController.create({
            component: PormptComponent,
            componentProps: {
              data: { mobileType, dismiss$: this.dismiss$, promptEvent: this.promptEvent },
            },
            cssClass: 'prompt-modal',
          });

          await modal.present();
          return modal;
        }),
      )
      .subscribe((modal): void => {
        this.dismiss$.pipe(take(1)).subscribe(() => {
          void modal.dismiss();
        });
      });
  }
}
