'use client';
import mqtt, { MqttClient, IClientOptions } from 'mqtt';
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import {MqttSensorsDataResponse} from "@/src/types/interfaces/mqtt-sensors-data-response";
import {MqttCommands} from "@/src/types/enums/mqtt-commands";
import {showToast} from "@/src/utils/custom-events";
import {shouldRefreshUssdBalance} from "@/src/utils/ussd-balance-hepler";
import {parseUssdResponse} from "@/src/utils/parsers";

const MQTT_DEFAULT_OPTIONS: IClientOptions = {
    encoding: 'utf8',
    protocol: 'wss',
    clean: true,
    connectTimeout: 5000,
    reconnectPeriod: 2000,
    keepalive: 30,

};

let client: MqttClient | null = null;

export const getMqttClient = (activeCar: MqttSettings, onMessageCallback: (sensorsData: MqttSensorsDataResponse) => void): MqttClient => {
    if (client && client.options.clientId !== `${activeCar.id}_${activeCar.name}`) {
        disconnectMqtt();
        return getMqttClient(activeCar, onMessageCallback);
    }
    if (!client) {
        client = mqtt.connect(`wss://${activeCar.server}`, {
            ...MQTT_DEFAULT_OPTIONS,
            username: activeCar.user,
            password: activeCar.pass,
            port: +activeCar.port,
            clientId: `${activeCar.id}_${activeCar.name}`,
        });

        client.on('connect', () => {
            useSettingsStore.getState().setMqttStatus('connected');

            client!.subscribe(`${activeCar.topic}/pub`, {qos: 0});
            client!.subscribe(`${activeCar.topic}/pub/ussd`, { qos: 0 });

            sendCommand(`${activeCar.topic}`, MqttCommands.Update);
            const currentUssdCache = useSettingsStore.getState().getUssdDataForCar?.(activeCar.id);
            if (shouldRefreshUssdBalance(currentUssdCache)) {
                sendCommand(`${activeCar.topic}`, MqttCommands.Ussd);
            }

            showToast('Соединение с брокером установлено');
        });
        client.on('offline', () => {
            useSettingsStore.getState().setMqttStatus('disconnected');
        });
        client.on('reconnect', () => {
            useSettingsStore.getState().setMqttStatus('connecting');
        });
        client.on('message', (topic: string, message: Buffer) => {
            const payload = message.toString();
            if (topic.endsWith('/pub/ussd')) {
                const parsedUssd = parseUssdResponse(payload);
                useSettingsStore.getState().setUssdData?.(activeCar.id, parsedUssd);
                return;
            }

            onMessageCallback(JSON.parse(payload) as MqttSensorsDataResponse);
        });
        client.on('error', (error) => {
            showToast(error.message, 'error');
        });
    }

    return client;
};

export const sendCommand = (topic: string, message: MqttCommands | `timer=${number}` | `${MqttCommands.StarterCrankTime}${number}`) => {
    if (client?.connected) {
        client.publish(`${topic}/sub`, message, { qos: 1 });
    }
};

export const disconnectMqtt = () => {
    if (client) {
        client.end();
        client = null;
    }
};
