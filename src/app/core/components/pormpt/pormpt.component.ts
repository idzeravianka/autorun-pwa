import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { IonButton } from '@ionic/angular/standalone';
import { Subject } from 'rxjs';

@Component({
  standalone: true,
  selector: 'az-pormpt',
  templateUrl: './pormpt.component.html',
  styleUrls: ['./pormpt.component.scss'],
  imports: [IonButton],
})
export class PormptComponent {
  @ViewChild(IonModal) modal: IonModal;

  public data: {
    mobileType: 'ios' | 'android';
    dismiss$: Subject<void>;
    promptEvent: Event & { prompt: () => void };
  };

  public installPwa(): void {
    this.data.promptEvent.prompt();
    this.close();
  }

  public close() {
    this.data.dismiss$.next();
  }
}
