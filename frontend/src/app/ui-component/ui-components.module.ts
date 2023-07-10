import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiHeaderComponent } from './ui-header/ui-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UiHeaderComponent],
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule],
  exports: [UiHeaderComponent],
})
export class UiComponentsModule {}
