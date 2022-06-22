import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MagicCastCalculatorComponent } from './magic-cast-calculator/magic-cast-calculator.component';
import { SkillProgressComponent } from './skill-progress/skill-progress.component';

const routes: Routes = [
  { path: '', redirectTo: 'skills', pathMatch: 'full' },
  {
    path: 'skills',
    component: SkillProgressComponent,
  },
  {
    path: 'magic-cast-calculator',
    component: MagicCastCalculatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
