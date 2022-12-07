import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { SwiperModule } from 'swiper/angular';

import { HoldButtonModule } from '../../shared/modules/hold-button/hold-button.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainControlButtonsComponent } from './components/main-control-buttons/main-control-buttons.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

SwiperCore.use([Navigation, Pagination]);

@NgModule({
  declarations: [
    DashboardComponent,
    MainControlButtonsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HoldButtonModule,
    SwiperModule,
  ],
})
export class DashboardModule { }
