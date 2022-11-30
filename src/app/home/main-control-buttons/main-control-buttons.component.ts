import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject, filter, skip, take, takeUntil } from 'rxjs';

import { AutoCloseable } from '../../core/classes/auto-closable';
import { DashboardItemNames } from '../../core/enums/dashboard-item-names';
import { ModalActions } from '../../core/enums/modal-actions';
import { MqttCommands } from '../../core/enums/mqtt-commands';
import { PinStatuses } from '../../core/enums/pin-statuses';
import { MqttSensorsDataResponse } from '../../core/interfaces/mqtt-sensors-data-response';
import { DashboardItemsSettings } from '../../core/interfaces/mqtt-settings';
import { MqttService } from '../../core/services/mqtt.service';
import {
  DashboardItemEditModalComponent,
} from '../../shared/components/dashboard-item-edit-modal/dashboard-item-edit-modal.component';

@Component({
  selector: 'az-main-control-buttons',
  templateUrl: './main-control-buttons.component.html',
  styleUrls: ['./main-control-buttons.component.scss'],
})
export class MainControlButtonsComponent extends AutoCloseable implements OnInit {
  public sensorsData$: BehaviorSubject<MqttSensorsDataResponse | null> = this.mqttService.sensorsData$;
  public hasInternetConnection$: BehaviorSubject<boolean> = this.mqttService.hasInternetConnection$;
  public dashboardItemsSettings: DashboardItemsSettings;
  public pinStatuses: typeof PinStatuses = PinStatuses;
  public dashboardItemNames: typeof DashboardItemNames = DashboardItemNames;
  public isEditDashboardModeEnabled: boolean;
  public isStartStopExecuting: boolean;
  public isOpenLockExecuting: boolean;
  public isCloseLockExecuting: boolean;
  public isFanOnExecuting: boolean;
  public isFanOffExecuting: boolean;

  constructor(private notifier: NotifierService, private mqttService: MqttService, private modalCtrl: ModalController) { super(); }

  public ngOnInit() {
    this.mqttService.dashboardItemsSettings$.pipe(
      takeUntil(this.destroyedSource),
    ).subscribe(settings => {
      this.dashboardItemsSettings = settings;
    });
    this.mqttService.isEditDashboardModeEnabled$.pipe(
      takeUntil(this.destroyedSource),
    ).subscribe(v => {
      this.isEditDashboardModeEnabled = v;
    });
  }

  public async openItemEditModalFor(sensorName: DashboardItemNames): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: DashboardItemEditModalComponent,
      componentProps: {
        itemName: this.dashboardItemsSettings[sensorName].name,
        isVisibleOnDashboard: this.dashboardItemsSettings[sensorName].isVisible,
        itemType: sensorName,
      },
      cssClass: 'dashboard-item-edit-modal',
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === ModalActions.Confirm) {
      this.mqttService.updateDashboardElementsSettings(sensorName, data);
    }
  }

  public startStopEngine(): void {
    this.sensorsData$.pipe(
      filter<MqttSensorsDataResponse | null>(Boolean),
      take(1),
    ).subscribe(sensorsData => {
      if (sensorsData.pin?.[PinStatuses.K2] === 0) {
        this.mqttService.sendCommand(MqttCommands.StartEngine);
        this.notifier.notify('warning', 'Выполняется попытка запуска');
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
    key: 'isStartStopExecuting' | 'isOpenLockExecuting' | 'isCloseLockExecuting' | 'isFanOnExecuting' | 'isFanOffExecuting',
  ): void {
    this[key] = true;
    if (key === 'isStartStopExecuting' || key === 'isFanOnExecuting' || key === 'isFanOffExecuting') {
      this.sensorsData$.pipe(
        skip(1),
        filter<MqttSensorsDataResponse | null>(Boolean),
        take(1),
      ).subscribe(() => {
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
