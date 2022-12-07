import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MqttService } from './core/services/mqtt.service';

@Component({
  selector: 'az-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'Анатомия автозапуска';

  constructor(private router: Router, private mqttService: MqttService) {
  }

  public ngOnInit() {
    this.mqttService.connect();
  }
}
