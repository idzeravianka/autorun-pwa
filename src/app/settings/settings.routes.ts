import { Routes } from '@angular/router';

import { ConnectionComponent } from './connection/connection.component';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { MenuComponent } from './menu/menu.component';
import { SettingsComponent } from './settings-component/settings.component';

export const settingRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        component: MenuComponent,
        pathMatch: 'full',
      },
      {
        path: 'devices-list',
        component: DevicesListComponent,
      },
      {
        path: 'connection',
        component: ConnectionComponent,
      },
    ],
  },
];
