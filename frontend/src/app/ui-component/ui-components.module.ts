import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiHeaderComponent } from './ui-header/ui-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UiHeaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    RouterModule,
  ],
  exports: [UiHeaderComponent, MatSidenavModule],
})
export class UiComponentsModule {}
