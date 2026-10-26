export interface MqttSensorsDataResponse {
  pin: number[];
  temp: number[];
  time: number[];
  control: number[];
}

export interface UssdData {
  balance: string | null;
  megabytes: string | null;
  raw: string;
  updatedAt: string;
  lastCheckedDate: string;
  timestamp: number;
}
