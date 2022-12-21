import { Component, ViewChild } from '@angular/core';
import { IonPopover, RangeCustomEvent } from '@ionic/angular';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject, filter, skip, take } from 'rxjs';

import { MqttCommands } from '../core/enums/mqtt-commands';
import { PinStatuses } from '../core/enums/pin-statuses';
import { TemperatureStatuses } from '../core/enums/temperature-statuses';
import { TimeStatuses } from '../core/enums/time-statuses';
import { MqttSensorsDataResponse } from '../core/interfaces/mqtt-sensors-data-response';
import { MqttService } from '../core/services/mqtt.service';

@Component({
  selector: 'az-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePageComponent {
  @ViewChild('popover') popover: IonPopover;

  public updateTime$: BehaviorSubject<string> = this.mqttService.updateTime$;
  public sensorsData$: BehaviorSubject<MqttSensorsDataResponse | null> = this.mqttService.sensorsData$;
  public hasInternetConnection$: BehaviorSubject<boolean> = this.mqttService.hasInternetConnection$;
  public pinStatuses: typeof PinStatuses = PinStatuses;
  public temperatureStatuses: typeof TemperatureStatuses = TemperatureStatuses;
  public timeStatuses: typeof TimeStatuses = TimeStatuses;
  public isUpdateInProgress: boolean;
  public isTimerSetInProgress: boolean;
  public isTimerSettingOpen: boolean;
  public timerValue: number = 0;
  public timerData$:  BehaviorSubject<number> = this.mqttService.timerData$;

  constructor(private mqttService: MqttService, private notifier: NotifierService) {}

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
    this.mqttService.sendCommand(MqttCommands.Update);
    this.isUpdateInProgress = true;
    this.sensorsData$.pipe(
      skip(1),
      filter<MqttSensorsDataResponse | null>(Boolean),
      take(1),
    ).subscribe(() => {
      this.isUpdateInProgress = false;
      if (event) event.target.complete();
    });
  }
}
