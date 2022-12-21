/* eslint-disable no-magic-numbers */
import { Inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NotifierService } from 'angular-notifier';
import { Client, ConnectionOptions, ErrorWithInvocationContext, Message, MQTTError } from 'paho-mqtt';
import {
  BehaviorSubject,
  delay,
  filter,
  fromEvent,
  Subject,
  takeUntil,
} from 'rxjs';

import { WINDOW_OBJECT } from '../../app.module';
import { AutoCloseable } from '../classes/auto-closable';
import { TimeStatuses } from '../enums/time-statuses';
import { MqttSensorsDataResponse } from '../interfaces/mqtt-sensors-data-response';
import { MqttSettings } from '../interfaces/mqtt-settings';

@Injectable({
  providedIn: 'root',
})
export class MqttService extends AutoCloseable {
  public sensorsData$: BehaviorSubject<MqttSensorsDataResponse | null> = new BehaviorSubject<MqttSensorsDataResponse | null>(null);
  public updateTime$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public timerData$: BehaviorSubject<number> = new BehaviorSubject(0);
  public hasInternetConnection$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private client: Client;
  private mqttSettings: MqttSettings;
  private destroyedTimerSource$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private notifier: NotifierService,
    @Inject(WINDOW_OBJECT) private window: Window,
    private swUpdate: SwUpdate,
  ) {
    super();
  }

  public checkAppVersion(): void {
    this.swUpdate.versionUpdates.subscribe((event) => {
      switch (event.type) {
        case 'VERSION_READY':
          this.swUpdate.activateUpdate().then(() => {
            this.window.location.reload();
          });
          break;
      }
    });
  }

  public listenInternetConnection(): void {
    const isOnline = this.window.navigator.onLine;
    this.hasInternetConnection$.next(isOnline);

    if (!isOnline) {
      this.notifier.notify('warning', ' Интернет соединение отсутствует');
    }

    fromEvent(this.window, 'online').pipe(
      takeUntil(this.destroyedSource),
    ).subscribe(() => {
      this.hasInternetConnection$.next(true);
      this.notifier.notify('success', 'Интернет соединение установлено');
      this.connect();
    });
    fromEvent(this.window, 'offline').pipe(
      takeUntil(this.destroyedSource),
    ).subscribe(() => {
      this.hasInternetConnection$.next(false);
      this.notifier.notify('warning', ' Интернет соединение потеряно');
    });
  }

  public updateSensorsData(): void {
    this.connect();
  }

  public getMqttSavedSettings(): string | null {
    return localStorage.getItem('mqtt_seting');
  }

  public clearMqttConnectionSettings(): void {
    localStorage.removeItem('mqtt_seting');

    if (this.client) {
      this.client.disconnect();
    }
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

  public setTimerData(): void {
    this.sensorsData$.pipe(
      filter<MqttSensorsDataResponse | null>(Boolean),
      takeUntil(this.destroyedSource),
    ).subscribe(sensorsData => {
      this.timerData$.next(sensorsData?.time?.[TimeStatuses.Timer] || 0);
      this.destroyedTimerSource$.next(true);
      this.updateTimer();
    });
  }

  public sendCommand(command: string): void {
    const message_pub = new Message(command);
    message_pub.destinationName = `${this.mqttSettings.topic}/sub`;
    this.client.send(message_pub);
  }

  public setTimer(seconds: number): void {
    const message_pub = new Message(`timer=${seconds}`);
    message_pub.destinationName = `${this.mqttSettings.topic}/sub`;
    this.client.send(message_pub);
  }

  private initClient(): void {
    this.client = new Client(this.mqttSettings.server, Number(this.mqttSettings.port), `web_${ parseInt(`${Math.random() * 100}`, 10)}`);
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
    this.client.connect(this.getConnectionOptions());
  }

  private onConnect = () => {
    this.notifier.notify('success', 'Соединение с авто установлено');
    this.client.subscribe(`${this.mqttSettings.topic}/pub`);
    const message_pub = new Message('update');
    message_pub.destinationName = `${this.mqttSettings.topic}/sub`;
    this.client.send(message_pub);
  };

  private onConnectionLost = (resObject: MQTTError) => {
    this.notifier.notify('error', `${resObject.errorCode}:${resObject.errorMessage}`);
  };

  private onMessageArrived = (message: Message) => {
    this.updateTime$.next(new Date().toTimeString().slice(0, 8));
    this.sensorsData$.next(JSON.parse(message.payloadString));
  };

  private onFailure = (message: ErrorWithInvocationContext) => {
    this.notifier.notify('error', `${message.errorCode}:${message.errorMessage}`);
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

  private updateTimer(): void {
    const oneSecond = 1000;
    this.timerData$.pipe(
      delay(oneSecond),
      filter(timerData => timerData > 0),
      takeUntil(this.destroyedTimerSource$),
    ).subscribe(v => {
      this.timerData$.next(--v);
    });
  }
}
