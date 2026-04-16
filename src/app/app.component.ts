import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonContent } from '@ionic/angular/standalone';

import { HeaderComponent } from './core/components/header/header.component';
import { MqttService } from './core/services/mqtt.service';

@Component({
  selector: 'az-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonHeader, IonContent, HeaderComponent],
  host: {
    '(document:visibilitychange)': 'onVisibilityChange()',
  },
})
export class AppComponent implements OnInit {
  private mqttService: MqttService = inject(MqttService);

  ngOnInit() {
    // this.newVersionPromptService.checkAppVersion();
    this.mqttService.setDashboardElementsSettings();
    this.mqttService.listenInternetConnection();
    if (this.mqttService.hasInternetConnection()) {
      this.mqttService.connect();
    }
    this.mqttService.setTimerData();
  }

  public onVisibilityChange(): void {
    if (document.visibilityState === 'visible') {
      this.mqttService.updateSensorsData();
    }
  }
}
