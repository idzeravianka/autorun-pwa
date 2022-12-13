import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToTimePipe } from './to-time.pipe';

@NgModule({
  declarations: [ToTimePipe],
  imports: [
    CommonModule,
  ],
  exports: [ToTimePipe],
})
export class ToTimeModule { }
