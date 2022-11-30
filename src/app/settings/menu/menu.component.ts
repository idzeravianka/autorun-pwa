import { Component, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { WINDOW_OBJECT } from '../../app.module';
import { MqttService } from '../../core/services/mqtt.service';

@Component({
  selector: 'az-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public hasInternetConnection$: BehaviorSubject<boolean> = this.mqttService.hasInternetConnection$;
  public version$: BehaviorSubject<string> = this.mqttService.version$;

  constructor(
    private mqttService: MqttService,
    private navController: NavController,
    @Inject(WINDOW_OBJECT) private window: Window,
  ) { }

  public navigateTo(urlSegment: string): void {
    this.navController.navigateForward(urlSegment);
  }

  public openTelegram(): void {
    this.window.open('https://t.me/+Vw4C60B8Yqob_JWc', '_blank');
  }
}
