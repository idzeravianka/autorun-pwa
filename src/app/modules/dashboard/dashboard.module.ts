import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { SwiperModule } from 'swiper/angular';

import { HoldButtonModule } from '../../shared/modules/hold-button/hold-button.module';
import { ActionSelectorComponent } from './components/action-selector/action-selector.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainControlButtonsComponent } from './components/main-control-buttons/main-control-buttons.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

SwiperCore.use([Navigation, Pagination]);

@NgModule({
  declarations: [
    DashboardComponent,
    MainControlButtonsComponent,
    ActionSelectorComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HoldButtonModule,
    SwiperModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
})
export class DashboardModule { }
