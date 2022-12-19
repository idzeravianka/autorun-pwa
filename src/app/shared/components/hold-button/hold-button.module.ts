import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HoldButtonComponent } from './hold-button.component';

@NgModule({
  declarations: [
    HoldButtonComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    HoldButtonComponent,
  ],
})
export class HoldButtonModule { }
