import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AgreementDialogComponent } from './agreement-dialog.component';

@NgModule({
  declarations: [
    AgreementDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    AgreementDialogComponent,
  ],
})
export class AgreementDialogModule { }
