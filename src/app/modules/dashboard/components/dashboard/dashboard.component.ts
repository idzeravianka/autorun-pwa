import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, skip, take } from 'rxjs';

import { MqttCommands } from '../../../../core/enums/mqtt-commands';
import { PinStatuses } from '../../../../core/enums/pin-statuses';
import { TemperatureStatuses } from '../../../../core/enums/temperature-statuses';
import { TimeStatuses } from '../../../../core/enums/time-statuses';
import { MqttSensorsDataResponse } from '../../../../core/interfaces/mqtt-sensors-data-response';
import { MqttService } from '../../../../services/mqtt.service';

@Component({
  selector: 'az-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public updateTime$: BehaviorSubject<string> = this.mqttService.updateTime$;
  public sensorsData$: BehaviorSubject<MqttSensorsDataResponse> = this.mqttService.sensorsData$;
  public pinStatuses: typeof PinStatuses = PinStatuses;
  public temperatureStatuses: typeof TemperatureStatuses = TemperatureStatuses;
  public timeStatuses: typeof TimeStatuses = TimeStatuses;
  public isStartStopExecuting: boolean;

  constructor(private mqttService: MqttService) { }

  public ngOnInit(): void {
  }

  public startStopEngine(): void {
    this.sensorsData$.pipe(
      filter<MqttSensorsDataResponse>(Boolean),
      take(1),
    ).subscribe(sensorsData => {
      if (sensorsData.pin?.[PinStatuses.K2] === 0) {
        this.mqttService.sendCommand(MqttCommands.StartEngine);
      }

      if (sensorsData.pin?.[PinStatuses.K2] === 1) {
        this.mqttService.sendCommand(MqttCommands.StopEngine);
      }

      this.runStartStopSpinner();
    });
  }

  private runStartStopSpinner(): void {
    this.isStartStopExecuting = true;
    this.sensorsData$.pipe(
      skip(1),
      filter<MqttSensorsDataResponse>(Boolean),
      take(1),
    ).subscribe(() => {
      this.isStartStopExecuting = false;
    });
  }

}
