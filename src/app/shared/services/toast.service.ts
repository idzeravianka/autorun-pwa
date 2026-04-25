import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastController: ToastController = inject(ToastController);

  public showToast(toastMessage: string, severity: string): void {
    this.toastController
      .create({
        message: toastMessage,
        duration: 2000,
        position: 'bottom',
        color: severity,
      })
      .then((toast) => {
        return toast.present();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
