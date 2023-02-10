import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { DashboardItemNames } from '../../../core/enums/dashboard-item-names';
import { ModalActions } from '../../../core/enums/modal-actions';

@Component({
  selector: 'az-dashboard-item-edit-modal',
  templateUrl: './dashboard-item-edit-modal.component.html',
  styleUrls: ['./dashboard-item-edit-modal.component.scss'],
})
export class DashboardItemEditModalComponent implements OnInit {
  @Input() public itemName: string;
  @Input() public isVisibleOnDashboard: boolean;
  @Input() public itemType: DashboardItemNames;

  public form: FormGroup;
  public itemTypes: typeof DashboardItemNames = DashboardItemNames;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.initForm();
  }

  public initForm(): void {
    this.form = new FormGroup({
      itemName: new FormControl(this.itemName || ''),
      isVisibleOnDashboard: new FormControl(!!this.isVisibleOnDashboard),
    });
  }

  public cancel(): void {
    this.modalCtrl.dismiss(null, ModalActions.Cancel);
  }

  public confirm(): void {
    const formValues = this.form.value;
    this.modalCtrl.dismiss(
      { name: formValues.itemName, isVisible: formValues.isVisibleOnDashboard },
      ModalActions.Confirm);
  }
}
