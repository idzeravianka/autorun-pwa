import { Component, OnInit } from '@angular/core';

import { MqttService } from './core/services/mqtt.service';
import { NewVersionPromptService } from './core/services/new-version-prompt.service';

@Component({
  selector: 'az-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(document:visibilitychange)': 'onVisibilityChange()',
  },
})
export class AppComponent implements OnInit {
  constructor(private mqttService: MqttService, private newVersionPromptService: NewVersionPromptService) {}

  ngOnInit() {
    this.newVersionPromptService.checkAppVersion();
    this.mqttService.setDashboardElementsSettings();
    this.mqttService.listenInternetConnection();
    if (this.mqttService.hasInternetConnection$.value) { this.mqttService.connect(); }
    this.mqttService.setTimerData();
  }

  public onVisibilityChange(): void {
    if (document.visibilityState === 'visible') {
      this.mqttService.updateSensorsData();
    }
  }
}
