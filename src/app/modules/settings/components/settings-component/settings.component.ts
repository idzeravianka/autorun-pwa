import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MqttService } from '../../../../services/mqtt.service';

@Component({
  selector: 'az-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public settingsForm: FormGroup;

  constructor(private mqttService: MqttService) { }

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
