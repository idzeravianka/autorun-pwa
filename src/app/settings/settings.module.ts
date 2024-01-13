import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GetErrorTextModule } from '../shared/pipes/get-error-text/get-error-text.module';
import { ConnectionComponent } from './connection/connection.component';
import { MenuComponent } from './menu/menu.component';
import { SettingsComponent } from './settings-component/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    SettingsComponent,
    ConnectionComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    GetErrorTextModule,
  ],
})
export class SettingsModule { }
