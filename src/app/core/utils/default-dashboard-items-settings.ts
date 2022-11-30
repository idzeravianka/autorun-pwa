import { DashboardItemNames } from '../enums/dashboard-item-names';
import { DashboardItemsSettings } from '../interfaces/mqtt-settings';

export const getDefaultDashboardItemsSettings = (): DashboardItemsSettings => {
  return {
    [DashboardItemNames.Voltage]: {
      name: 'Заряд АКБ',
      isVisible: true,
    },
    [DashboardItemNames.K1]: {
      name: 'Реле K1',
      isVisible: true,
    },
    [DashboardItemNames.K2]: {
      name: 'Зажигание',
      isVisible: true,
    },
    [DashboardItemNames.K4]: {
      name: 'Реле K4',
      isVisible: true,
    },
    [DashboardItemNames.K5]: {
      name: 'Реле K5',
      isVisible: true,
    },
    [DashboardItemNames.IN1]: {
      name: 'Канал IN1',
      isVisible: true,
    },
    [DashboardItemNames.IN2]: {
      name: 'Канал IN2',
      isVisible: true,
    },
    [DashboardItemNames.Temp1]: {
      name: 'Датчик №1',
      isVisible: true,
    },
    [DashboardItemNames.Temp2]: {
      name: 'Датчик №2',
      isVisible: true,
    },
    [DashboardItemNames.Temp3]: {
      name: 'Датчик №3',
      isVisible: true,
    },
    [DashboardItemNames.Timer]: {
      name: 'Таймер',
      isVisible: true,
    },
    [DashboardItemNames.Count]: {
      name: 'Счетчик',
      isVisible: true,
    },
    [DashboardItemNames.CentralLock]: {
      name: '',
      isVisible: true,
    },
    [DashboardItemNames.WebastoButtons]: {
      name: '',
      isVisible: true,
    },
  };
};
