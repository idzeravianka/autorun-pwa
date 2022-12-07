import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectionComponent } from './components/connection/connection.component';
import { MenuComponent } from './components/menu/menu.component';
import { SettingsComponent } from './components/settings-component/settings.component';
import { TimerComponent } from './components/timer/timer.component';

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
      {
        path: 'timer',
        component: TimerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }
