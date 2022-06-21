import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HiscoreSkill } from '../hiscores/hiscore-skill';
import { Skill } from '../hiscores/skill.enum';
import { LevelsService } from '../services/levels.service';

export interface IMagicCastRow {
  spell: string;
  cost?: number;
  xpPerThousandCasts: number;
  xpPerHour: number;
  hours?: number;
  casts?: number;
}

@Component({
  selector: 'app-magic-cast-calculator',
  templateUrl: './magic-cast-calculator.component.html',
  styleUrls: ['./magic-cast-calculator.component.css'],
})
export class MagicCastCalculatorComponent implements OnInit {
  public displayedColumns: string[] = ['spell', 'xpPerThousandCasts', 'xpPerHour', 'hours', 'casts'];
  private isProduction = environment.production;

  public dataSource: IMagicCastRow[] = [
    { spell: 'Fire Strike', cost: 305, xpPerThousandCasts: 23600, xpPerHour: 28500 },
    { spell: 'Fire Bolt', cost: 400, xpPerThousandCasts: 45200, xpPerHour: 50200 },
    { spell: 'Fire Blast', cost: 525, xpPerThousandCasts: 56200, xpPerHour: 67300 },
    { spell: 'Fire Wave', cost: 655, xpPerThousandCasts: 61333, xpPerHour: 69500 },
  ];

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      currentLevel: { value: 1, disabled: true },
      currentXp: [!this.isProduction ? 3660000 : 0],
      targetLevel: 99,
      targetXp: Skill.MAX_XP,
      xpDifference: { value: 0, disabled: true },
    });
    this.calculateRates();
  }

  public submit(): void {
    this.calculateRates();
  }

  public calculateRates(): void {
    const targetXp = LevelsService.getLevelExperience(this.form.get('targetLevel').value);
    const xpDifference = targetXp - this.form.get('currentXp').value;
    this.form.patchValue({
      xpDifference: xpDifference,
      targetXp: targetXp,
      currentLevel: LevelsService.getLevelFromXp(this.form.get('currentXp').value),
    });
    this.dataSource.forEach((row: IMagicCastRow) => {
      row.hours = xpDifference / row.xpPerHour;
      row.casts = (xpDifference / row.xpPerThousandCasts) * 1000;
    });
  }

  public getMagicSkill(): HiscoreSkill {
    const rank: number = 1;
    const level: number = this.form.get('currentLevel').value;
    const xp: number = this.form.get('currentXp').value;
    const csv = `${rank},${level},${xp}`;
    console.log(csv);
    return new HiscoreSkill(Skill.Magic, csv);
  }

  public getTargetXp(): number {
    return this.form.get('targetXp').value;
  }
}
