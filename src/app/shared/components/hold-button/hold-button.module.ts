import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { HoldButtonComponent } from './hold-button.component';

@NgModule({
  declarations: [
    HoldButtonComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgCircleProgressModule,
  ],
  exports: [
    HoldButtonComponent,
  ],
})
export class HoldButtonModule { }
