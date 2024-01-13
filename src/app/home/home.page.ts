import { Component, OnInit, ViewChild } from '@angular/core';
import { IonPopover, ModalController, RangeCustomEvent } from '@ionic/angular';
import { NotifierService } from 'angular-notifier';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  Observable,
  of,
  skip,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';

import { AutoCloseable } from '../core/classes/auto-closable';
import { DashboardItemNames } from '../core/enums/dashboard-item-names';
import { ModalActions } from '../core/enums/modal-actions';
import { MqttCommands } from '../core/enums/mqtt-commands';
import { PinStatuses } from '../core/enums/pin-statuses';
import { TemperatureStatuses } from '../core/enums/temperature-statuses';
import { TimeStatuses } from '../core/enums/time-statuses';
import { MqttSensorsDataResponse } from '../core/interfaces/mqtt-sensors-data-response';
import { DashboardItemsSettings } from '../core/interfaces/mqtt-settings';
import { MqttService } from '../core/services/mqtt.service';
import {
  DashboardItemEditModalComponent,
} from '../shared/components/dashboard-item-edit-modal/dashboard-item-edit-modal.component';

@Component({
  selector: 'az-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePageComponent extends AutoCloseable implements OnInit {
  @ViewChild('popover') popover: IonPopover;

  public updateTime$: BehaviorSubject<string> = this.mqttService.updateTime$;
  public sensorsData$: BehaviorSubject<MqttSensorsDataResponse | null> = this.mqttService.sensorsData$;
  public hasInternetConnection$: BehaviorSubject<boolean> = this.mqttService.hasInternetConnection$;
  public dashboardItemsSettings: DashboardItemsSettings;
  public pinStatuses: typeof PinStatuses = PinStatuses;
  public temperatureStatuses: typeof TemperatureStatuses = TemperatureStatuses;
  public timeStatuses: typeof TimeStatuses = TimeStatuses;
  public dashboardItemNames: typeof DashboardItemNames = DashboardItemNames;
  public isEditDashboardModeEnabled: boolean;
  public isTimerSetInProgress: boolean;
  public isTimerSettingOpen: boolean;
  public timerValue: number = 0;
  public timerData$:  BehaviorSubject<number> = this.mqttService.timerData$;

  constructor(private mqttService: MqttService, private notifier: NotifierService, private modalCtrl: ModalController) { super(); }

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
      },
      cssClass: 'dashboard-item-edit-modal',
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

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
    this.mqttService.sensorsData$.pipe(
      skip(1),
      take(1),
    ).subscribe(() => {
      this.notifier.notify('success', 'Таймер установлен');
      this.isTimerSetInProgress = false;
      this.toggleTimerSettingPopover(false);
    });
  }

  public updateSensorsData(event?: any): void {
    combineLatest([
      this.sensorsData$,
      this.hasInternetConnection$,
    ]).pipe(
      take(1),
      switchMap(([sensorsData, hasInternetConnection]) => {
        if (!sensorsData || !hasInternetConnection) {
          this.notifier.notify('warning', !sensorsData ? 'Нет данных для обновления' : 'Интернет соединение отсутствует');
          return of(null);
        }

        this.mqttService.sendCommand(MqttCommands.Update);
        return this.waitTillSensorsDataUpdated();
      }),
      tap(() => {
        if (event) event.target.complete();
      }),
    ).subscribe();
  }

  private waitTillSensorsDataUpdated(): Observable<MqttSensorsDataResponse> {
    return this.sensorsData$.pipe(
      skip(1),
      filter<MqttSensorsDataResponse | null>(Boolean),
      take(1),
    );
  }
}
