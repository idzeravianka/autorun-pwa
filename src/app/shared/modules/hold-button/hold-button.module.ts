import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HoldButtonComponent } from './hold-button.component';

@NgModule({
  declarations: [
    HoldButtonComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  exports: [
    HoldButtonComponent,
  ],
})
export class HoldButtonModule { }
