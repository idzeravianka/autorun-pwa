import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { RouterToggleModule } from '../../directives/router-toggle.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterToggleModule,
    RouterLinkActive,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule { }
