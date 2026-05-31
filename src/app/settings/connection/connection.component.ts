import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonList, IonInput, IonButton } from '@ionic/angular/standalone';

import { MqttSettings } from '../../core/interfaces/mqtt-settings';
import { MqttService } from '../../core/services/mqtt.service';
import { UserSettingsService } from '../../core/services/user-settings.service';
import { GetErrorText } from '../../shared/pipes/get-error-text/get-error-text.pipe';

interface MqttSettingsForm {
  name: FormControl<string | null>;
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
  public entityIdForEdit: string | null;

  private userSettingsService: UserSettingsService = inject(UserSettingsService);
  private mqttService: MqttService = inject(MqttService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.entityIdForEdit = this.route.snapshot.queryParamMap.get('entityId') ?? null;
    this.initSettingsForm();
  }

  public saveSettings(): void {
    this.settingsForm.markAllAsTouched();
    if (this.settingsForm.invalid) return;

    if (this.entityIdForEdit) {
      this.mqttService.updateMqttSettings(
        this.entityIdForEdit,
        this.settingsForm.value as MqttSettings,
      );
    } else {
      this.mqttService.saveMqttSettings(this.settingsForm.value as MqttSettings);
    }
  }

  private initSettingsForm(): void {
    const savedSettings =
      (this.entityIdForEdit &&
        this.userSettingsService.getEntitySettingsById(this.entityIdForEdit)) ||
      null;

    this.settingsForm = new FormGroup({
      name: new FormControl(savedSettings?.name ?? null, [Validators.required]),
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
