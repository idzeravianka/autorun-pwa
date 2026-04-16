import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { IonContent, IonList, IonInput, IonButton } from '@ionic/angular/standalone';
import { from, take } from 'rxjs';

import { MqttSettings } from '../../core/interfaces/mqtt-settings';
import { MqttService } from '../../core/services/mqtt.service';
import { GetErrorText } from '../../shared/pipes/get-error-text/get-error-text.pipe';

interface MqttSettingsForm {
  server: FormControl<string | null>;
  port: FormControl<string | null>;
  user: FormControl<string | null>;
  pass: FormControl<string | null>;
  topic: FormControl<string | null>;
}

@Component({
  selector: 'az-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
  standalone: true,
  imports: [IonContent, IonList, IonInput, ReactiveFormsModule, AsyncPipe, IonButton, GetErrorText],
})
export class ConnectionComponent implements OnInit {
  public settingsForm: FormGroup<MqttSettingsForm>;

  private mqttService: MqttService = inject(MqttService);
  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);

  public ngOnInit(): void {
    this.initSettingsForm();
  }

  public saveSettings(): void {
    this.settingsForm.markAllAsTouched();
    if (this.settingsForm.invalid) {
      return;
    }

    this.mqttService.saveMqttSettings(this.settingsForm.value as MqttSettings);
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
    const savedSettings: MqttSettings | null = this.mqttService.getMqttSavedSettings()
      ? (JSON.parse(this.mqttService.getMqttSavedSettings()!) as MqttSettings)
      : null;

    this.settingsForm = new FormGroup({
      server: new FormControl(savedSettings?.server ?? null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z\\.0-9]+$'),
      ]),
      port: new FormControl(savedSettings?.port ?? null, [
        Validators.required,
        Validators.pattern('[0-9]{0,10}'),
      ]),
      user: new FormControl(savedSettings?.user ?? null, [Validators.required]),
      pass: new FormControl(savedSettings?.pass ?? null, [Validators.required]),
      topic: new FormControl(savedSettings?.topic ?? null, [Validators.required]),
    });
  }
}
