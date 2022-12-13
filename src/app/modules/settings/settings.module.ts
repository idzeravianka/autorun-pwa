import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

import { AgreementDialogModule } from '../../shared/modules/agreement-dialog/agreement-dialog.module';
import { ConnectionComponent } from './components/connection/connection.component';
import { MenuComponent } from './components/menu/menu.component';
import { SettingsComponent } from './components/settings-component/settings.component';
import { TimerComponent } from './components/timer/timer.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    SettingsComponent,
    ConnectionComponent,
    MenuComponent,
    TimerComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    AgreementDialogModule,
    MatSliderModule,
    FormsModule,
  ],
})
export class SettingsModule { }
