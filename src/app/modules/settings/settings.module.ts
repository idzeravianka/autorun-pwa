import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SettingsComponent } from './components/settings-component/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
  ],
})
export class SettingsModule { }
