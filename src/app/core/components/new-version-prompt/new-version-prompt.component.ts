import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ModalActions } from '../../enums/modal-actions';

@Component({
  selector: 'az-new-version-prompt',
  templateUrl: './new-version-prompt.component.html',
  styleUrls: ['./new-version-prompt.component.scss'],
})
export class NewVersionPromptComponent implements OnInit {
  @Input() content: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  public cancel(): void {
    this.modalCtrl.dismiss(null, ModalActions.Cancel);
  }

  public confirm(): void {
    this.modalCtrl.dismiss(null, ModalActions.Confirm);
  }
}
