import { Inject, Injectable } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { ModalController } from '@ionic/angular';
// import { take } from 'rxjs';

import { WINDOW_OBJECT } from '../../app.module';
import { NewVersionPromptComponent } from '../components/new-version-prompt/new-version-prompt.component';
import { ModalActions } from '../enums/modal-actions';

@Injectable({
  providedIn: 'root',
})
export class NewVersionPromptService {

  constructor(private modalController: ModalController, private swUpdate: SwUpdate, @Inject(WINDOW_OBJECT) private window: Window) { }

  public checkAppVersion(): void {
    // const media = window.matchMedia('(display-mode: standalone)').matches;
    // const navigatorStandalone = (navigator as any).standalone;
    // const andref = document.referrer.includes('android-app://');
    //
    // if (!media && !navigatorStandalone && !andref) { return; }

    this.swUpdate.versionUpdates.pipe(/*take(1)*/).subscribe(async (event: VersionEvent) => {
      if (event.type === 'VERSION_READY') {
        // this.swUpdate.activateUpdate().then(() => {
        //   this.window.location.reload();
        // });
        const modal = await this.modalController.create({
          component: NewVersionPromptComponent,
        });

        await modal.present();
        const { role } = await modal.onWillDismiss();

        if (role === ModalActions.Confirm) {
          this.swUpdate.activateUpdate().then(() => {
            this.window.location.reload();
          });
        }
      }
    });
  }
}
