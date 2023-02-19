import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ModalController } from '@ionic/angular';
import { filter, switchMap, take } from 'rxjs';

import { WINDOW_OBJECT } from '../../app.module';
import { AutoCloseable } from '../classes/auto-closable';
import { NewVersionPromptComponent } from '../components/new-version-prompt/new-version-prompt.component';
import { ModalActions } from '../enums/modal-actions';

@Injectable({
  providedIn: 'root',
})
export class NewVersionPromptService extends AutoCloseable {

  constructor(
    private modalController: ModalController,
    private swUpdate: SwUpdate,
    @Inject(WINDOW_OBJECT) private window: Window,
    private httpClient: HttpClient,
  ) { super(); }

  public checkAppVersion(): void {
    this.swUpdate.versionUpdates
      .pipe(
        filter(event => event.type === 'VERSION_READY'),
        take(1),
        switchMap(() => this.httpClient.get('assets/md/new-version-prompt-content/new-version.html', { responseType: 'text' })),
      ).subscribe(async (htmlFile) => {
        if (!htmlFile.length) {
          this.activateUpdate();
          return;
        }

        const modal = await this.modalController.create({
          component: NewVersionPromptComponent,
          componentProps: { content: htmlFile },
        });

        await modal.present();
        const { role } = await modal.onWillDismiss();

        if (role === ModalActions.Confirm) {
          this.activateUpdate();
        }
      });
  }

  private activateUpdate(): void {
    this.swUpdate.activateUpdate().then(() => {
      this.window.location.reload();
    });
  }
}
