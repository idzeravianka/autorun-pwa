import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { MqttService } from '../../core/services/mqtt.service';

@Component({
  selector: 'az-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public hasInternetConnection$: BehaviorSubject<boolean> = this.mqttService.hasInternetConnection$;

  constructor(private mqttService: MqttService, private navController: NavController) { }

  public navigateTo(urlSegment: string): void {
    this.navController.navigateForward(urlSegment);
  }
}
