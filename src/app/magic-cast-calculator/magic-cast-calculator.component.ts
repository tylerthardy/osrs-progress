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

const CASTS_PER_HOUR = 1200;

@Component({
  selector: 'app-magic-cast-calculator',
  templateUrl: './magic-cast-calculator.component.html',
  styleUrls: ['./magic-cast-calculator.component.css'],
})
export class MagicCastCalculatorComponent implements OnInit {
  public displayedColumns: string[] = ['spell', 'xpPerThousandCasts', 'xpPerHour', 'hours', 'casts'];
  private isProduction = environment.production;

  public dataSource: IMagicCastRow[] = [
    { spell: 'Fire Strike', cost: 305, xpPerThousandCasts: -1, xpPerHour: 23300 },
    { spell: 'Fire Bolt', cost: 400, xpPerThousandCasts: -1, xpPerHour: 50200 },
    { spell: 'Fire Blast', cost: 525, xpPerThousandCasts: -1, xpPerHour: 67300 },
    { spell: 'Fire Wave', cost: 655, xpPerThousandCasts: -1, xpPerHour: 69500 },
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
    this.form.get('targetLevel').valueChanges.subscribe(() => this.calculateRates());
    this.form.get('currentXp').valueChanges.subscribe(() => this.calculateRates());
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
      row.xpPerThousandCasts = (row.xpPerHour / CASTS_PER_HOUR) * 1000;
      row.hours = xpDifference / row.xpPerHour;
      row.casts = (xpDifference / row.xpPerThousandCasts) * 1000;
    });
  }

  public getMagicSkill(): HiscoreSkill {
    const rank: number = 1;
    const level: number = this.form.get('currentLevel').value;
    const xp: number = this.form.get('currentXp').value;
    const csv = `${rank},${level},${xp}`;
    return new HiscoreSkill(Skill.Magic, csv);
  }

  public getTargetXp(): number {
    return this.form.get('targetXp').value;
  }

  public toggleSettings(): void {
    if (this.displayedColumns[0] === 'adjust') {
      this.displayedColumns.shift();
    } else {
      this.displayedColumns.unshift('adjust');
    }
  }

  public adjust(row: IMagicCastRow): void {
    let input: string = prompt('XP/hr', row.xpPerHour.toString());
    let result: number = Number.parseInt(input);
    if (isNaN(result)) {
      return;
    }
    row.xpPerHour = result;
    this.calculateRates();
  }
}
