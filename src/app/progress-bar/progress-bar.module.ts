import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar.component';

@NgModule({
  exports: [ProgressBarComponent],
  declarations: [ProgressBarComponent],
  imports: [CommonModule],
})
export class ProgressBarModule {}
