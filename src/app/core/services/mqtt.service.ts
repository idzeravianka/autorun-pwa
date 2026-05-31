import { DestroyRef, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Client,
  ConnectionOptions,
  ErrorWithInvocationContext,
  Message,
  MQTTError,
} from 'paho-mqtt';
import { fromEvent } from 'rxjs';

import { WINDOW_OBJECT } from 'src/app/app.config';
import { ToastService } from 'src/app/shared/services/toast.service';

import { UserSettingsService } from './user-settings.service';
import { DashboardItemNames } from '../enums/dashboard-item-names';
import { TimeStatuses } from '../enums/time-statuses';
import { MqttSensorsDataResponse } from '../interfaces/mqtt-sensors-data-response';
import {
  DashboardItemsSettings,
  ItemSettings,
  MqttSettings,
  UserSettings,
} from '../interfaces/mqtt-settings';
import { getDefaultDashboardItemsSettings } from '../utils/default-dashboard-items-settings';
import { generateId } from '../utils/generate-id';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  public readonly sensorsData: WritableSignal<MqttSensorsDataResponse | null> = signal(null);
  public readonly updateTime: WritableSignal<string> = signal('');
  public readonly timerData: WritableSignal<number> = signal(0);
  public readonly hasInternetConnection: WritableSignal<boolean> = signal(false);
  public readonly isEditDashboardModeEnabled: WritableSignal<boolean> = signal(false);
  public readonly dashboardItemsSettings: WritableSignal<DashboardItemsSettings> = signal(
    getDefaultDashboardItemsSettings(),
  );

  private client: Client;
  private mqttSettings: MqttSettings | null;

  private userSettingsService: UserSettingsService = inject(UserSettingsService);
  private destroyRef = inject(DestroyRef);
  private toastService = inject(ToastService);
  private window: Window = inject(WINDOW_OBJECT);

  private userSettings: Signal<UserSettings | null> = this.userSettingsService.userSettings;

  public setDashboardElementsSettings(): void {
    const savedMqttSettings = this.userSettingsService.selectedCarSettings();
    const dashboardElementsVisibility =
      savedMqttSettings?.dashboardItemsSettings ?? getDefaultDashboardItemsSettings();

    this.dashboardItemsSettings.set(dashboardElementsVisibility);
  }

  public updateDashboardElementsSettings(
    itemName: DashboardItemNames,
    settings: ItemSettings,
  ): void {
    this.dashboardItemsSettings.update((dashboardSettings) => ({
      ...dashboardSettings,
      [itemName]: { ...settings },
    }));
  }

  public saveDashboardElementsSettings(): void {
    if (!this.userSettings()) return;
    this.userSettingsService.saveSettings({
      ...this.userSettings()!,
      savedEntities: this.userSettings()!.savedEntities.map((entity) =>
        entity.id === this.userSettings()?.selectedEntityId
          ? { ...entity, dashboardItemsSettings: this.dashboardItemsSettings() }
          : entity,
      ),
    });
  }

  public toggleDashboardEditMode(): void {
    this.isEditDashboardModeEnabled.update((isEditable) => !isEditable);
  }

  public listenInternetConnection(): void {
    const isOnline = this.window.navigator.onLine;
    this.hasInternetConnection.set(isOnline);
    console.log(isOnline);
    if (!isOnline) {
      this.toastService.showToast('Интернет соединение отсутствует', 'warning');
    }

    fromEvent(this.window, 'online')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.hasInternetConnection.set(true);
        this.toastService.showToast('Интернет соединение установлено', 'success');
        this.connect();
      });
    fromEvent(this.window, 'offline')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        console.log('offline');
        this.hasInternetConnection.set(false);
        this.toastService.showToast('Интернет соединение потеряно', 'warning');
      });
  }

  public updateSensorsData(): void {
    this.connect();
  }

  public saveMqttSettings(settings: MqttSettings): void {
    const entityId = generateId();
    const savedSettings = this.userSettings() ?? {
      selectedEntityId: null,
      savedEntities: [],
    };
    this.userSettingsService.saveSettings({
      ...savedSettings,
      selectedEntityId: entityId,
      savedEntities: [...savedSettings.savedEntities, { ...settings, id: entityId }],
    });

    this.reconnect();
  }

  public updateMqttSettings(entityId: string, settings: MqttSettings): void {
    this.userSettingsService.saveSettings({
      ...this.userSettings()!,
      savedEntities: this.userSettings()!.savedEntities.map((entity) =>
        entity.id === entityId ? { ...settings, id: entityId } : entity,
      ),
    });
    this.connect();
  }

  public connect(): void {
    this.mqttSettings = this.userSettingsService.selectedCarSettings();

    if (this.mqttSettings?.server && this.mqttSettings?.port) {
      this.initClient();
    }
  }

  public reconnect(): void {
    this.sensorsData.set(null);
    if (this.client?.isConnected()) {
      this.client.disconnect();
    }
    this.connect();
  }

  public setTimerData(): void {
    if (!this.sensorsData()) return;

    this.timerData.set(this.sensorsData()?.time?.[TimeStatuses.Timer] ?? 0);
    this.updateTimer();
  }

  public sendCommand(command: string): void {
    const message_pub = new Message(command);
    message_pub.destinationName = `${this.mqttSettings!.topic}/sub`;
    this.client.send(message_pub);
  }

  public setTimer(seconds: number): void {
    const message_pub = new Message(`timer=${seconds}`);
    message_pub.destinationName = `${this.mqttSettings!.topic}/sub`;
    this.client.send(message_pub);
  }

  private initClient(): void {
    this.client = new Client(
      this.mqttSettings!.server,
      Number(this.mqttSettings!.port),
      `web_${parseInt(`${Math.random() * 100}`, 10)}`,
    );
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
    this.client.connect(this.getConnectionOptions());
  }

  private onConnect = () => {
    this.toastService.showToast('Соединение с брокером установлено', 'success');
    this.client.subscribe(`${this.mqttSettings!.topic}/pub`);
    const message_pub = new Message('update');
    message_pub.destinationName = `${this.mqttSettings!.topic}/sub`;
    this.client.send(message_pub);
  };

  private onConnectionLost = (resObject: MQTTError) => {
    if (resObject.errorCode === 0) {
      this.toastService.showToast(`${resObject.errorCode}:${resObject.errorMessage}`, 'warning');
    } else {
      this.toastService.showToast(`${resObject.errorCode}:${resObject.errorMessage}`, 'danger');
    }
  };

  private onMessageArrived = (message: Message) => {
    this.updateTime.set(new Date().toTimeString().slice(0, 8));
    this.sensorsData.set(JSON.parse(message.payloadString) as MqttSensorsDataResponse | null);
    this.setTimerData();
  };

  private onFailure = (message: ErrorWithInvocationContext) => {
    this.toastService.showToast(`${message.errorCode}:${message.errorMessage}`, 'danger');
  };

  private getConnectionOptions(): ConnectionOptions {
    return {
      useSSL: true,
      userName: this.mqttSettings!.user,
      password: this.mqttSettings!.pass,
      onSuccess: this.onConnect,
      onFailure: this.onFailure,
    };
  }

  private updateTimer(): void {
    const oneSecond = 1000;

    if (this.timerData() > 0) {
      this.timerData.update((timer) => --timer);
      return;
    }

    setTimeout(() => this.updateTimer(), oneSecond);
  }
}
