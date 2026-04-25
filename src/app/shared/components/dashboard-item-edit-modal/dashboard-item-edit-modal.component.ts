import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { DashboardItemNames } from '../../../core/enums/dashboard-item-names';
import { ModalActions } from '../../../core/enums/modal-actions';

@Component({
  standalone: true,
  selector: 'az-dashboard-item-edit-modal',
  templateUrl: './dashboard-item-edit-modal.component.html',
  styleUrls: ['./dashboard-item-edit-modal.component.scss'],
  imports: [
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonCheckbox,
    ReactiveFormsModule,
  ],
})
export class DashboardItemEditModalComponent implements OnInit {
  public itemName = '';
  public isVisibleOnDashboard = false;
  public itemType: DashboardItemNames | null = null;

  public form: FormGroup<{
    itemName: FormControl<string | null>;
    isVisibleOnDashboard: FormControl<boolean | null>;
  }>;
  public itemTypes: typeof DashboardItemNames = DashboardItemNames;

  private modalCtrl: ModalController = inject(ModalController);

  ngOnInit() {
    this.initForm();
  }

  public initForm(): void {
    this.form = new FormGroup({
      itemName: new FormControl(this.itemName ?? ''),
      isVisibleOnDashboard: new FormControl(this.isVisibleOnDashboard),
    });
  }

  public async cancel(): Promise<void> {
    await this.modalCtrl.dismiss(null, ModalActions.Cancel);
  }

  public async confirm(): Promise<void> {
    const formValues = this.form.value;
    await this.modalCtrl.dismiss(
      { name: formValues.itemName, isVisible: formValues.isVisibleOnDashboard },
      ModalActions.Confirm,
    );
  }
}
