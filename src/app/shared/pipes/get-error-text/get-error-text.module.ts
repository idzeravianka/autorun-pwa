import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GetErrorText } from './get-error-text.pipe';

@NgModule({
  declarations: [GetErrorText],
  imports: [
    CommonModule,
  ],
  exports: [GetErrorText],
})
export class GetErrorTextModule { }
