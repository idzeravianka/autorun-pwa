import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { NotifierService } from 'angular-notifier';
import { skip, take } from 'rxjs';

import { MqttService } from '../../../../core/services/mqtt.service';

const defaultTimerValue = 10;

@Component({
  selector: 'az-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  public timerValue: number = defaultTimerValue;
  public isLoading: boolean;

  constructor(private mqttService: MqttService, private notifier: NotifierService) {}

  public updateTimerValue(change: MatSliderChange): void {
    this.timerValue = change.value as number;
  }

  public saveTimer(): void {
    this.isLoading = true;
    this.mqttService.setTimer(this.timerValue);
    this.mqttService.sensorsData$.pipe(
      skip(1),
      take(1),
    ).subscribe(() => {
      this.notifier.notify('success', 'Таймер установлен');
      this.isLoading = false;
    });
  }
}
