import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'az-pormpt',
  templateUrl: './pormpt.component.html',
  styleUrls: ['./pormpt.component.scss'],
})
export class PormptComponent {
  @ViewChild(IonModal) modal: IonModal;

  public data: { mobileType: 'ios' | 'android'; dismiss$: Subject<void>; promptEvent?: any };

  constructor() {}

  public installPwa(): void {
    this.data.promptEvent.prompt();
    this.close();
  }

  public close() {
    this.data.dismiss$.next();
  }
}
