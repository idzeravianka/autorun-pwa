import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
export class DashboardComponent {
  public updateTime$: BehaviorSubject<string> = this.mqttService.updateTime$;
  public sensorsData$: BehaviorSubject<MqttSensorsDataResponse | null> = this.mqttService.sensorsData$;
  public pinStatuses: typeof PinStatuses = PinStatuses;
  public temperatureStatuses: typeof TemperatureStatuses = TemperatureStatuses;
  public timeStatuses: typeof TimeStatuses = TimeStatuses;

  constructor(private mqttService: MqttService) { }
}
