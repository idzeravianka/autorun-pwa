import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewVersionPromptService {
  // private modalController: ModalController,
  // private swUpdate: SwUpdate,
  // private httpClient: HttpClient,

  public checkAppVersion(): void {
    // this.swUpdate.versionUpdates
    //   .pipe(
    //     filter(event => event.type === 'VERSION_READY'),
    //     take(1),
    //     switchMap(() => this.httpClient.get('assets/md/new-version-prompt-content/new-version.html', { responseType: 'text' })),
    //   ).subscribe(async (htmlFile) => {
    //     if (!htmlFile.length) {
    //       this.activateUpdate();
    //       return;
    //     }
    //
    //     const modal = await this.modalController.create({
    //       component: NewVersionPromptComponent,
    //       componentProps: { content: htmlFile },
    //     });
    //
    //     await modal.present();
    //     const { role } = await modal.onWillDismiss();
    //
    //     if (role === ModalActions.Confirm) {
    //       this.activateUpdate();
    //     }
    //   });
  }

  private activateUpdate(): void {
    // this.swUpdate.activateUpdate().then(() => {
    //   this.window.location.reload();
    // });
  }
}
