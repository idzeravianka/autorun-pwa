import { Component, OnInit } from '@angular/core';

import { MqttService } from './core/services/mqtt.service';

@Component({
  selector: 'az-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private mqttService: MqttService) {}

  ngOnInit() {
    this.mqttService.connect();
    this.mqttService.setTimerData();
  }
}
