import { Component } from '@angular/core';
import { BehaviorSubject, filter, skip, take } from 'rxjs';

import { MqttCommands } from '../../core/enums/mqtt-commands';
import { MqttSensorsDataResponse } from '../../core/interfaces/mqtt-sensors-data-response';
import { MqttService } from '../../core/services/mqtt.service';

const actions: { value: string; viewValue: string }[] = [
  { value: MqttCommands.Scenario6, viewValue: 'Сценарий 6' },
  { value: MqttCommands.Scenario7, viewValue: 'Сценарий 7' },
  { value: MqttCommands.Scenario8, viewValue: 'Сценарий 8' },
  { value: MqttCommands.Scenario9, viewValue: 'Сценарий 9' },
  { value: MqttCommands.IN2ControlOn, viewValue: 'Контроль In2 ВКЛ' },
  { value: MqttCommands.IN2ControlOff, viewValue: 'Контроль In2 ВЫКЛ' },
  { value: MqttCommands.ThermostatOn, viewValue: 'Термостат ВКЛ' },
  { value: MqttCommands.ThermostatOff, viewValue: 'Термостат ВЫКЛ' },
  { value: MqttCommands.StarterCrankTime1Sec, viewValue: 'Время прокрутки стартером 1 сек' },
  { value: MqttCommands.StarterCrankTime2And5Sec, viewValue: 'Время прокрутки стартером 2.5 сек' },
  { value: MqttCommands.StarterCrankTime4Sec, viewValue: 'Время прокрутки стартером 4 сек' },
  { value: MqttCommands.WiFiOn, viewValue: 'Включить WI-FI' },
  { value: MqttCommands.Reboot, viewValue: 'Перезагрузить контроллер' },
];

@Component({
  selector: 'az-action-selector',
  templateUrl: './action-selector.component.html',
  styleUrls: ['./action-selector.component.scss'],
})
export class ActionSelectorComponent {
  public hasInternetConnection$: BehaviorSubject<boolean> = this.mqttService.hasInternetConnection$;
  public sensorsData$: BehaviorSubject<MqttSensorsDataResponse | null> = this.mqttService.sensorsData$;
  public actions: { value: string; viewValue: string }[] = actions;
  public selectedAction = actions[0].value;
  public isLoading: boolean;

  constructor(private mqttService: MqttService) {}

  public sendCommand(): void {
    this.mqttService.sendCommand(this.selectedAction);
    this.isLoading = true;
    this.mqttService.sensorsData$.pipe(
      skip(1),
      filter<MqttSensorsDataResponse | null>(Boolean),
      take(1),
    ).subscribe(() => {
      this.isLoading = false;
    });
  }
}
