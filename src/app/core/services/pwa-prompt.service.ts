import { Injectable } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Subject, take, timer } from 'rxjs';

import { PormptComponent } from '../components/pormpt/pormpt.component';

@Injectable({
  providedIn: 'root',
})
export class PwaPromptService {
  private promptEvent: any;
  private dismiss$: Subject<void> = new Subject<void>();

  constructor(
    private modalController: ModalController,
    private platform: Platform,
  ) { }

  public initPwaPrompt() {
    if (this.platform.is('android')) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.is('ios')) {
      // @ts-ignore
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    const debounce = 3000;
    timer(debounce)
      .pipe(take(1))
      .subscribe(async () => {
        const modal = await this.modalController.create({
          component: PormptComponent,
          componentProps: { data: { mobileType, dismiss$: this.dismiss$, promptEvent: this.promptEvent } },
          cssClass: 'prompt-modal',
        });

        await modal.present();

        this.dismiss$.pipe(
          take(1),
        ).subscribe(async () => {
          await modal.dismiss();
        });
      });
  }
}
