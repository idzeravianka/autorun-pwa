import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { matDialogConfig } from '../../../../core/configs/mat-dialog-config';
import { MqttService } from '../../../../core/services/mqtt.service';
import { AgreementDialogComponent } from '../../../../shared/modules/agreement-dialog/agreement-dialog.component';

@Component({
  selector: 'az-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent implements OnInit {

  public settingsForm: FormGroup;

  constructor(private mqttService: MqttService, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.initSettingsForm();
  }

  public saveSettings(): void {
    this.settingsForm.markAllAsTouched();
    if (this.settingsForm.invalid) { return; }

    const values = this.settingsForm.value;
    this.mqttService.saveMqttSettings(values);
  }

  public resetForm(): void {
    const dialogRef = this.dialog.open(AgreementDialogComponent, matDialogConfig);
    dialogRef.componentInstance.title = 'Внимание';
    dialogRef.componentInstance.agreementText = 'Вы действительно хотите удалить настройки для подключения?';
    dialogRef.componentInstance.agreeBtnText = 'Да';
    dialogRef.componentInstance.cancelBtnText = 'Нет';

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.mqttService.clearMqttConnectionSettings();
      this.settingsForm.reset();
    });
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
