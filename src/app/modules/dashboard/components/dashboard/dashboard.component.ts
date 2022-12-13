import { Component } from '@angular/core';
import { BehaviorSubject, filter, skip, take } from 'rxjs';

import { AutoCloseable } from '../../../../core/classes/auto-closable';
import { MqttCommands } from '../../../../core/enums/mqtt-commands';
import { PinStatuses } from '../../../../core/enums/pin-statuses';
import { TemperatureStatuses } from '../../../../core/enums/temperature-statuses';
import { TimeStatuses } from '../../../../core/enums/time-statuses';
import { MqttSensorsDataResponse } from '../../../../core/interfaces/mqtt-sensors-data-response';
import { MqttService } from '../../../../core/services/mqtt.service';

@Component({
  selector: 'az-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends AutoCloseable {
  public updateTime$: BehaviorSubject<string> = this.mqttService.updateTime$;
  public sensorsData$: BehaviorSubject<MqttSensorsDataResponse | null> = this.mqttService.sensorsData$;
  public pinStatuses: typeof PinStatuses = PinStatuses;
  public temperatureStatuses: typeof TemperatureStatuses = TemperatureStatuses;
  public timeStatuses: typeof TimeStatuses = TimeStatuses;
  public isUpdateInProgress: boolean;
  public timerData$:  BehaviorSubject<number> = this.mqttService.timerData$;

  constructor(private mqttService: MqttService) {
    super();
  }

  public updateSensorsData(): void {
    this.mqttService.sendCommand(MqttCommands.Update);
    this.isUpdateInProgress = true;
    this.sensorsData$.pipe(
      skip(1),
      filter<MqttSensorsDataResponse | null>(Boolean),
      take(1),
    ).subscribe(() => {
      this.isUpdateInProgress = false;
    });
  }
}
