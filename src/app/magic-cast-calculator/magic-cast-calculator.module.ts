import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { MagicCastCalculatorComponent } from './magic-cast-calculator.component';
import { MagicCastCalculatorService } from './magic-cast-calculator.service';

@NgModule({
  exports: [MagicCastCalculatorComponent],
  declarations: [MagicCastCalculatorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ProgressBarModule,
  ],
  providers: [MagicCastCalculatorService],
})
export class MagicCastCalculatorModule {}
