import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { SwiperModule } from 'swiper/angular';

import { HeaderModule } from '../header/header.module';
import {
  DashboardItemEditModalModule,
} from '../shared/components/dashboard-item-edit-modal/dashboard-item-edit-modal.module';
import { HoldButtonModule } from '../shared/components/hold-button/hold-button.module';
import { ToTimeModule } from '../shared/pipes/to-time/to-time.module';
import { ActionSelectorComponent } from './action-selector/action-selector.component';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home.page';
import { MainControlButtonsComponent } from './main-control-buttons/main-control-buttons.component';

SwiperCore.use([Navigation, Pagination]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderModule,
    ToTimeModule,
    HoldButtonModule,
    SwiperModule,
    DashboardItemEditModalModule,
  ],
  declarations: [HomePageComponent, MainControlButtonsComponent, ActionSelectorComponent],
})
export class HomePageModule {}
