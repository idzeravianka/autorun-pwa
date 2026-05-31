import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';

import { LOCAL_STORAGE } from '../../app.config';
import { MqttSettings, UserSettings } from '../interfaces/mqtt-settings';
import { generateId } from '../utils/generate-id';

const SETTINGS_KEY = 'autorun_mqtt_settings';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  public readonly userSettings: Signal<UserSettings | null>;
  public readonly selectedCarSettings: Signal<MqttSettings | null> = computed(() => {
    return (
      this.userSettings()?.savedEntities.find(
        (entity) => entity.id === this.userSettings()?.selectedEntityId,
      ) ?? null
    );
  });

  private _userSettings: WritableSignal<UserSettings | null> = signal(null);
  private localStorage: Storage = inject(LOCAL_STORAGE);

  constructor() {
    this.userSettings = this._userSettings.asReadonly();
  }

  public saveSettings(settings: UserSettings) {
    this.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    this._userSettings.set(settings);
  }

  public getEntitySettingsById(entityId: string): MqttSettings | null {
    return this._userSettings()?.savedEntities.find((entity) => entity.id === entityId) ?? null;
  }

  public loadAllSettings(): void {
    const supported = localStorage.getItem(SETTINGS_KEY);

    if (supported) {
      this._userSettings.set(JSON.parse(supported) as UserSettings);
      return;
    }

    const deprecated = localStorage.getItem('mqtt_seting');
    if (deprecated) {
      this.updateDeprecatedSettings(deprecated);
      const updated = localStorage.getItem(SETTINGS_KEY);
      this._userSettings.set(updated ? (JSON.parse(updated) as UserSettings) : null);
      return;
    }

    this._userSettings.set(null);
  }

  public changeSelectedEntity(entityId: string): void {
    if (!this.userSettings()) return;

    this.saveSettings({ ...this.userSettings()!, selectedEntityId: entityId });
  }

  public removeSettingsById(entityId: string): void {
    const settings = this.userSettings();
    if (!settings) return;

    settings.savedEntities = settings.savedEntities?.filter((entity) => entity.id !== entityId);
    if (settings.selectedEntityId === entityId) {
      settings.selectedEntityId = settings.savedEntities?.[0]?.id ?? null;
    }

    this.saveSettings(settings);
  }

  private updateDeprecatedSettings(deprecatedSettings: string): void {
    const entityId = generateId();
    const settings = JSON.parse(deprecatedSettings) as MqttSettings;

    this.saveSettings({
      selectedEntityId: entityId,
      savedEntities: [{ ...settings, id: entityId, name: 'Car #1' }],
    });
    this.localStorage.removeItem('mqtt_seting');
  }
}
