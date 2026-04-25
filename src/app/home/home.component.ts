import { Component, inject, ViewChild, Signal, ChangeDetectionStrategy } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  IonicModule,
  IonPopover,
  ModalController,
  RangeCustomEvent,
  RefresherCustomEvent,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { createOutline, create, closeOutline } from 'ionicons/icons';
import { filter, Observable, skip, take, tap } from 'rxjs';

import { ActionSelectorComponent } from './action-selector/action-selector.component';
import { MainControlButtonsComponent } from './main-control-buttons/main-control-buttons.component';
import { DashboardItemNames } from '../core/enums/dashboard-item-names';
import { ModalActions } from '../core/enums/modal-actions';
import { MqttCommands } from '../core/enums/mqtt-commands';
import { PinStatuses } from '../core/enums/pin-statuses';
import { TemperatureStatuses } from '../core/enums/temperature-statuses';
import { TimeStatuses } from '../core/enums/time-statuses';
import { MqttSensorsDataResponse } from '../core/interfaces/mqtt-sensors-data-response';
import { DashboardItemsSettings, ItemSettings } from '../core/interfaces/mqtt-settings';
import { MqttService } from '../core/services/mqtt.service';
import { DashboardItemEditModalComponent } from '../shared/components/dashboard-item-edit-modal/dashboard-item-edit-modal.component';
import { ToTimePipe } from '../shared/pipes/to-time/to-time.pipe';
import { ToastService } from '../shared/services/toast.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'az-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonicModule, MainControlButtonsComponent, ActionSelectorComponent, ToTimePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent {
  @ViewChild('popover') popover: IonPopover;

  public updateTime: Signal<string>;
  public sensorsData: Signal<MqttSensorsDataResponse | null>;
  public hasInternetConnection: Signal<boolean>;
  public dashboardItemsSettings: Signal<DashboardItemsSettings>;
  public isEditDashboardModeEnabled: Signal<boolean>;
  public timerData: Signal<number>;

  public pinStatuses: typeof PinStatuses = PinStatuses;
  public temperatureStatuses: typeof TemperatureStatuses = TemperatureStatuses;
  public timeStatuses: typeof TimeStatuses = TimeStatuses;
  public dashboardItemNames: typeof DashboardItemNames = DashboardItemNames;
  public isTimerSetInProgress: boolean;
  public isTimerSettingOpen: boolean;
  public timerValue = 0;

  private mqttService: MqttService = inject(MqttService);
  private modalCtrl: ModalController = inject(ModalController);
  private toastService: ToastService = inject(ToastService);

  constructor() {
    addIcons({ createOutline, create, closeOutline });
    this.updateTime = this.mqttService.updateTime;
    this.sensorsData = this.mqttService.sensorsData;
    this.hasInternetConnection = this.mqttService.hasInternetConnection;
    this.dashboardItemsSettings = this.mqttService.dashboardItemsSettings;
    this.isEditDashboardModeEnabled = this.mqttService.isEditDashboardModeEnabled;
    this.timerData = this.mqttService.timerData;
  }

  public async openItemEditModalFor(sensorName: DashboardItemNames): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: DashboardItemEditModalComponent,
      componentProps: {
        itemName: this.dashboardItemsSettings()[sensorName].name,
        isVisibleOnDashboard: this.dashboardItemsSettings()[sensorName].isVisible,
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

  public toggleTimerSettingPopover(isOpen: boolean, event?: Event): void {
    if (event) {
      this.popover.event = event;
    }
    this.isTimerSettingOpen = isOpen;
  }

  public onRangeChange(event: Event): void {
    this.timerValue = Number((event as RangeCustomEvent).detail.value);
  }

  public saveTimer(): void {
    this.isTimerSetInProgress = true;
    this.mqttService.setTimer(this.timerValue);

    // todo check that it's work
    toObservable(this.mqttService.sensorsData)
      .pipe(skip(1), take(1))
      .subscribe(() => {
        this.toastService.showToast('Таймер установлен', 'success');
        this.isTimerSetInProgress = false;
        this.toggleTimerSettingPopover(false);
      });
  }

  public updateSensorsData(event: RefresherCustomEvent): void {
    // todo check that it's work
    if (!this.sensorsData() || !this.hasInternetConnection()) {
      this.toastService.showToast(
        !this.sensorsData() ? 'Нет данных для обновления' : 'Интернет соединение отсутствует',
        'warning',
      );
      return;
    }

    this.mqttService.sendCommand(MqttCommands.Update);
    this.waitTillSensorsDataUpdated()
      .pipe(
        take(1),
        tap(() => {
          if (event) event.target.complete();
        }),
      )
      .subscribe();
  }

  private waitTillSensorsDataUpdated(): Observable<MqttSensorsDataResponse> {
    return toObservable(this.sensorsData).pipe(
      skip(1),
      filter<MqttSensorsDataResponse | null>(Boolean),
      take(1),
    );
  }
}
