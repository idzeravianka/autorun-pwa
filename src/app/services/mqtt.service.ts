/* eslint-disable no-magic-numbers */
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Client, ConnectionOptions, ErrorWithInvocationContext, Message, MQTTError } from 'paho-mqtt';
import { BehaviorSubject } from 'rxjs';

import { initialMqttSensorsData, MqttSensorsDataResponse } from '../core/interfaces/mqtt-sensors-data-response';
import { MqttSettings } from '../core/interfaces/mqtt-settings';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  public sensorsData$: BehaviorSubject<MqttSensorsDataResponse> = new BehaviorSubject<MqttSensorsDataResponse>(initialMqttSensorsData);
  public updateTime$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private client: Client;
  private mqttSettings: MqttSettings;

  constructor(private notifier: NotifierService) {}

  public getMqttSavedSettings(): string | null {
    return localStorage.getItem('mqtt_seting');
  }

  public saveMqttSettings(settings: MqttSettings): void {
    localStorage.setItem('mqtt_seting', JSON.stringify(settings));
    this.connect();
  }

  public connect(): void {
    const savedMqttSettings = this.getMqttSavedSettings();
    this.mqttSettings = savedMqttSettings ? JSON.parse(savedMqttSettings) : null;

    if (this.mqttSettings) {
      this.initClient();
    }

    if (!this.mqttSettings) {
      return;
    }
  }

  private initClient(): void {
    this.client = new Client(this.mqttSettings.server, Number(this.mqttSettings.port), `web_${ parseInt(`${Math.random() * 100}`, 10)}`);
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
    this.client.connect(this.getConnectionOptions());
  }

  private onConnect = () => {
    this.notifier.notify('success', 'Соединение установлено');
    this.client.subscribe(`${this.mqttSettings.topic}/pub`);
    const message_pub = new Message('update');
    message_pub.destinationName = `${this.mqttSettings.topic}/sub`;
    this.client.send(message_pub);
  };

  private onConnectionLost = (resObject: MQTTError) => {
    if (resObject.errorCode !== 0) {
      this.notifier.notify('warning', `${resObject.errorCode}`);
    } else {
      this.notifier.notify('error', resObject.errorMessage);
    }
  };

  private onMessageArrived = (message: Message) => {
    this.updateTime$.next(new Date().toTimeString().slice(0, 8));
    this.sensorsData$.next(JSON.parse(message.payloadString));
  };

  private onFailure = (message: ErrorWithInvocationContext) => {
    this.notifier.notify('error', message.errorMessage);
  };

  private getConnectionOptions(): ConnectionOptions {
    return {
      useSSL:true,
      userName: this.mqttSettings.user,
      password: this.mqttSettings.pass,
      onSuccess: this.onConnect,
      onFailure: this.onFailure,
    };
  }
}
