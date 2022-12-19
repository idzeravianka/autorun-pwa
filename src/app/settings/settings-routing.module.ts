import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectionComponent } from './connection/connection.component';
import { MenuComponent } from './menu/menu.component';
import { SettingsComponent } from './settings-component/settings.component';

const routes: Routes = [
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
        path: 'connection',
        component: ConnectionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }
