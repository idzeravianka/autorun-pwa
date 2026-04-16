import { Component, inject, Signal } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonButton } from '@ionic/angular/standalone';

import { WINDOW_OBJECT } from 'src/app/app.config';

import { environment } from '../../../environments/environment';
import { MqttService } from '../../core/services/mqtt.service';

@Component({
  selector: 'az-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonButton],
})
export class MenuComponent {
  public hasInternetConnection: Signal<boolean>;
  public version: string = environment.version;

  private mqttService: MqttService = inject(MqttService);
  private navController: NavController = inject(NavController);
  private window: Window = inject(WINDOW_OBJECT);

  constructor() {
    this.hasInternetConnection = this.mqttService.hasInternetConnection;
  }

  public async navigateTo(urlSegment: string): Promise<void> {
    await this.navController.navigateForward(urlSegment);
  }

  public openTelegram(): void {
    this.window.open('https://t.me/+Vw4C60B8Yqob_JWc', '_blank');
  }
}
