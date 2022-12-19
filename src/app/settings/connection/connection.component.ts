import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { from, take } from 'rxjs';

import { MqttService } from '../../core/services/mqtt.service';

@Component({
  selector: 'az-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent implements OnInit {

  public settingsForm: FormGroup;

  constructor(private mqttService: MqttService, private actionSheetCtrl: ActionSheetController) {}

  public ngOnInit(): void {
    this.initSettingsForm();
  }

  public saveSettings(): void {
    this.settingsForm.markAllAsTouched();
    if (this.settingsForm.invalid) { return; }

    const values = this.settingsForm.value;
    this.mqttService.saveMqttSettings(values);
  }

  public async showConfirmationDialog(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Вы хотите удалить настройки подключения?',
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
          this.resetForm();
        }
      });
  }

  private resetForm(): void {
    this.mqttService.clearMqttConnectionSettings();
    this.settingsForm.reset();
  }

  private initSettingsForm(): void {
    const savedSettings = this.mqttService.getMqttSavedSettings()
      ? JSON.parse(this.mqttService.getMqttSavedSettings() as string)
      : null;

    this.settingsForm = new FormGroup({
      server: new FormControl(savedSettings?.server || null, [Validators.required, Validators.pattern('^[a-zA-Z\\.0-9]+$')]),
      port: new FormControl(savedSettings?.port || null, [Validators.required, Validators.pattern('[0-9]{0,10}')]),
      user: new FormControl(savedSettings?.user || null, [Validators.required]),
      pass: new FormControl(savedSettings?.pass || null, [Validators.required]),
      topic: new FormControl(savedSettings?.topic || null, [Validators.required]),
    });
  }
}
