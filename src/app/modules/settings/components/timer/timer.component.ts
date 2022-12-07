import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { skip, take } from 'rxjs';

import { MqttService } from '../../../../core/services/mqtt.service';

@Component({
  selector: 'az-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  public form: FormGroup;
  public isLoading: boolean;

  constructor(private mqttService: MqttService, private notifier: NotifierService) {
    this.form = new FormGroup({
      timer: new FormControl(null),
    });
  }

  public saveTimer(): void {
    // const secAtMin = 60;
    const timeInSeconds = Number(this.form.value.timer);
    this.isLoading = true;
    this.mqttService.setTimer(timeInSeconds);
    this.mqttService.sensorsData$.pipe(
      skip(1),
      take(1),
    ).subscribe(() => {
      this.notifier.notify('success', 'Таймер установлен');
      this.isLoading = false;
    });
  }
}
