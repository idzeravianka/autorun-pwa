import { Component } from '@angular/core';
import { BehaviorSubject, filter, skip, take } from 'rxjs';

import { MqttCommands } from '../../../../core/enums/mqtt-commands';
import { PinStatuses } from '../../../../core/enums/pin-statuses';
import { MqttSensorsDataResponse } from '../../../../core/interfaces/mqtt-sensors-data-response';
import { MqttService } from '../../../../services/mqtt.service';

@Component({
  selector: 'az-main-control-buttons',
  templateUrl: './main-control-buttons.component.html',
  styleUrls: ['./main-control-buttons.component.scss'],
})
export class MainControlButtonsComponent {
  public sensorsData$: BehaviorSubject<MqttSensorsDataResponse | null> = this.mqttService.sensorsData$;
  public pinStatuses: typeof PinStatuses = PinStatuses;
  public isStartStopExecuting: boolean;
  public isOpenLockExecuting: boolean;
  public isCloseLockExecuting: boolean;
  public isFanOnExecuting: boolean;
  public isFanOffExecuting: boolean;

  constructor(private mqttService: MqttService) { }

  public startStopEngine(): void {
    this.sensorsData$.pipe(
      filter<MqttSensorsDataResponse | null>(Boolean),
      take(1),
    ).subscribe(sensorsData => {
      if (sensorsData.pin?.[PinStatuses.K2] === 0) {
        this.mqttService.sendCommand(MqttCommands.StartEngine);
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
    this.sensorsData$.pipe(
      skip(1),
      filter<MqttSensorsDataResponse | null>(Boolean),
      take(1),
    ).subscribe(() => {
      this[key] = false;
    });
  }
}
