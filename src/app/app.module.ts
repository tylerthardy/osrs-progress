import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MagicCastCalculatorModule } from './magic-cast-calculator/magic-cast-calculator.module';
import { SkillProgressModule } from './skill-progress/skill-progress.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    SkillProgressModule,
    MagicCastCalculatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
