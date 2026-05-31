import { ChangeDetectorRef, Component, inject, OnInit, Signal } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, addCircleOutline } from 'ionicons/icons';
import { from, take } from 'rxjs';

import { MqttSettings, UserSettings } from '../../core/interfaces/mqtt-settings';
import { MqttService } from '../../core/services/mqtt.service';
import { UserSettingsService } from '../../core/services/user-settings.service';

@Component({
  selector: 'az-devices-list',
  templateUrl: './devices-list.coponent.html',
  styleUrls: ['./devices-list.component.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, IonList, IonItem, IonLabel],
})
export class DevicesListComponent implements OnInit {
  public allUserSettings: Signal<UserSettings | null>;

  private userSettingsService: UserSettingsService = inject(UserSettingsService);
  private navController: NavController = inject(NavController);
  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);
  private mqttService: MqttService = inject(MqttService);

  constructor() {
    addIcons({ createOutline, trashOutline, addCircleOutline });
  }

  public ngOnInit(): void {
    this.allUserSettings = this.userSettingsService.userSettings;
  }

  public async navigateTo(urlSegment: string): Promise<void> {
    await this.navController.navigateForward(urlSegment);
  }

  public async showConfirmationDialog(entity: MqttSettings): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Удалить настройки для ${entity.name}?`,
      buttons: [
        {
          text: 'Да',
          role: 'confirm',
        },
        {
          text: 'Нет',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();

    from(actionSheet.onWillDismiss())
      .pipe(take(1))
      .subscribe(({ role }) => {
        if (role === 'confirm') {
          this.userSettingsService.removeSettingsById(entity.id!);
          if (this.allUserSettings()?.selectedEntityId === entity.id) {
            this.mqttService.reconnect();
          }
        }
      });
  }
}
