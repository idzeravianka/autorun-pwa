import { Component, inject, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ModalController, IonicModule } from '@ionic/angular';
import { filter, skip, take } from 'rxjs';

import { HoldButtonComponent } from 'src/app/shared/components/hold-button/hold-button.component';

import { DashboardItemNames } from '../../core/enums/dashboard-item-names';
import { ModalActions } from '../../core/enums/modal-actions';
import { MqttCommands } from '../../core/enums/mqtt-commands';
import { PinStatuses } from '../../core/enums/pin-statuses';
import { MqttSensorsDataResponse } from '../../core/interfaces/mqtt-sensors-data-response';
import { DashboardItemsSettings, ItemSettings } from '../../core/interfaces/mqtt-settings';
import { MqttService } from '../../core/services/mqtt.service';
import { DashboardItemEditModalComponent } from '../../shared/components/dashboard-item-edit-modal/dashboard-item-edit-modal.component';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'az-main-control-buttons',
  templateUrl: './main-control-buttons.component.html',
  styleUrls: ['./main-control-buttons.component.scss'],
  standalone: true,
  imports: [IonicModule, HoldButtonComponent],
})
export class MainControlButtonsComponent {
  public sensorsData: Signal<MqttSensorsDataResponse | null>;
  public hasInternetConnection: Signal<boolean>;
  public dashboardItemsSettings: Signal<DashboardItemsSettings>;
  public pinStatuses: typeof PinStatuses = PinStatuses;
  public dashboardItemNames: typeof DashboardItemNames = DashboardItemNames;
  public isEditDashboardModeEnabled: Signal<boolean>;
  public isStartStopExecuting: boolean;
  public isOpenLockExecuting: boolean;
  public isCloseLockExecuting: boolean;
  public isFanOnExecuting: boolean;
  public isFanOffExecuting: boolean;

  private mqttService: MqttService = inject(MqttService);
  private modalCtrl: ModalController = inject(ModalController);
  private toastService = inject(ToastService);

  constructor() {
    this.sensorsData = this.mqttService.sensorsData;
    this.hasInternetConnection = this.mqttService.hasInternetConnection;
    this.dashboardItemsSettings = this.mqttService.dashboardItemsSettings;
    this.isEditDashboardModeEnabled = this.mqttService.isEditDashboardModeEnabled;
  }

  public async openItemEditModalFor(sensorName: DashboardItemNames): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: DashboardItemEditModalComponent,
      componentProps: {
        itemName: this.dashboardItemsSettings()[sensorName].name,
        isVisibleOnDashboard: this.dashboardItemsSettings()[sensorName].isVisible,
        itemType: sensorName,
      },
      cssClass: 'dashboard-item-edit-modal',
    });
    await modal.present();
    const { data, role } = (await modal.onWillDismiss()) as {
      data: ItemSettings;
      role: ModalActions;
    };
    if (role === ModalActions.Confirm) {
      this.mqttService.updateDashboardElementsSettings(sensorName, data);
    }
  }

  public startStopEngine(): void {
    // todo check that it's work
    toObservable(this.sensorsData)
      .pipe(filter<MqttSensorsDataResponse | null>(Boolean), take(1))
      .subscribe((sensorsData) => {
        if (sensorsData.pin?.[PinStatuses.K2] === 0) {
          this.mqttService.sendCommand(MqttCommands.StartEngine);
          this.toastService.showToast('Выполняется попытка запуска', 'warning');
        }

        if (sensorsData.pin?.[PinStatuses.K2] === 1) {
          this.mqttService.sendCommand(MqttCommands.StopEngine);
        }

        this.runStartStopSpinner('isStartStopExecuting');
      });
  }

  public fanOn(): void {
    this.mqttService.sendCommand(MqttCommands.FanOn);
    this.runStartStopSpinner('isFanOnExecuting');
  }

  public fanOff(): void {
    this.mqttService.sendCommand(MqttCommands.FanOff);
    this.runStartStopSpinner('isFanOffExecuting');
  }

  public openLock(): void {
    this.mqttService.sendCommand(MqttCommands.OpenLock);
    this.runStartStopSpinner('isOpenLockExecuting');
  }

  public closeLock(): void {
    this.mqttService.sendCommand(MqttCommands.CloseLock);
    this.runStartStopSpinner('isCloseLockExecuting');
  }

  private runStartStopSpinner(
    key:
      | 'isStartStopExecuting'
      | 'isOpenLockExecuting'
      | 'isCloseLockExecuting'
      | 'isFanOnExecuting'
      | 'isFanOffExecuting',
  ): void {
    this[key] = true;
    if (
      key === 'isStartStopExecuting' ||
      key === 'isFanOnExecuting' ||
      key === 'isFanOffExecuting'
    ) {
      // todo check that it's work
      toObservable(this.sensorsData)
        .pipe(skip(1), filter<MqttSensorsDataResponse | null>(Boolean), take(1))
        .subscribe(() => {
          this[key] = false;
        });
    } else {
      const debounce = 2500;
      setTimeout(() => {
        this[key] = false;
      }, debounce);
    }
  }
}
