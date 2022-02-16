import { Component, OnInit } from '@angular/core';
import { HiscoresService } from './hiscores/hiscores.service';
import { HiscoreSkill } from './hiscores/hiscore-skill';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HiscoreMode, HiscoreModes } from './hiscores/hiscore-modes.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, tap, catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { ColorSchemeService } from './color-scheme.service';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { Skill } from './hiscores/skill.enum';
import { MaxXpOption } from './max-xp-option.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'osrs-progress';

  public isLoading = false;
  public form: FormGroup;
  public modes: HiscoreMode[];
  public isProduction = environment.production;
  public maxXps: MaxXpOption[];

  private sortedSkills: HiscoreSkill[] = [];
  private unsortedSkills: HiscoreSkill[] = [];

  constructor(
    private hiscoresService: HiscoresService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public colorScheme: ColorSchemeService
  ) {
    colorScheme.load();
  }

  ngOnInit(): void {
    this.modes = HiscoreModes.getAll();
    this.maxXps = [
      { label: 'Standard (13m)', value: Skill.MAX_XP },
      { label: '25m', value: Skill.XP_25M },
      { label: '200m', value: Skill.XP_200M },
    ];
    this.form = this.formBuilder.group({
      username: [!this.isProduction ? 'perterter' : null, Validators.required],
      mode: HiscoreModes.STANDARD.slug,
      showPercent: false,
      sortSkills: false,
      maxXpOption: this.maxXps[0].value,
    });
  }

  public submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.fetchSkills();
  }

  public isCurrentlyDark(): boolean {
    return this.colorScheme.currentActive() === 'dark';
  }

  public toggleColorScheme() {
    this.colorScheme.update(this.isCurrentlyDark() ? 'light' : 'dark');
  }

  get maxXp(): number {
    return this.form.get('maxXpOption').value;
  }

  get skills(): HiscoreSkill[] {
    return this.form.get('sortSkills').value ? this.sortedSkills : this.unsortedSkills;
  }

  private sortSkills(skills: HiscoreSkill[]): HiscoreSkill[] {
    const sorted: HiscoreSkill[] = Object.assign([], skills);
    const overall = sorted.shift();

    sorted.sort((a, b) => (a.xp < b.xp ? 1 : -1));
    sorted.unshift(overall);

    return sorted;
  }

  private fetchSkills(): void {
    const username = this.form.get('username').value;
    const mode = this.form.get('mode').value;
    if (!username) {
      this.snackBar.open('You must specify a username');
      return;
    }

    this.isLoading = true;

    this.hiscoresService
      .getSkills(username, mode)
      .pipe(
        tap((skills: HiscoreSkill[]) => this.setSkills(skills)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }

  private setSkills(hiscoreSkills: HiscoreSkill[]): void {
    this.unsortedSkills = hiscoreSkills.filter((hiscoreSkill) => !hiscoreSkill.skill.nonSkill);
    this.sortedSkills = Object.assign([], this.sortSkills(this.unsortedSkills));
  }
}
