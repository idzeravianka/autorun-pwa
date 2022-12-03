import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MqttService } from './services/mqtt.service';

@Component({
  selector: 'az-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'autorun-pwa';

  constructor(private router: Router, private mqttService: MqttService) {
  }

  public ngOnInit() {
    this.mqttService.connect();
  }
}
