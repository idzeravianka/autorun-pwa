import { Component, inject, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { filter, skip, take } from 'rxjs';

import { HoldButtonComponent } from 'src/app/shared/components/hold-button/hold-button.component';

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
  standalone: true,
  imports: [IonicModule, HoldButtonComponent, FormsModule],
})
export class ActionSelectorComponent {
  public hasInternetConnection: Signal<boolean>;
  public sensorsData: Signal<MqttSensorsDataResponse | null>;
  public actions: { value: string; viewValue: string }[] = actions;
  public selectedAction = actions[0]!.value;
  public isLoading: boolean;

  private mqttService: MqttService = inject(MqttService);

  constructor() {
    this.hasInternetConnection = this.mqttService.hasInternetConnection;
    this.sensorsData = this.mqttService.sensorsData;
  }

  public sendCommand(): void {
    this.mqttService.sendCommand(this.selectedAction);
    this.isLoading = true;
    toObservable(this.mqttService.sensorsData)
      .pipe(skip(1), filter<MqttSensorsDataResponse | null>(Boolean), take(1))
      .subscribe(() => {
        this.isLoading = false;
      });
  }
}
