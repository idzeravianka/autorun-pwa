import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DashboardItemEditModalComponent } from './dashboard-item-edit-modal.component';

@NgModule({
  declarations: [DashboardItemEditModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [DashboardItemEditModalComponent],
})
export class DashboardItemEditModalModule { }
