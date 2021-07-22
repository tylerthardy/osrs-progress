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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'osrs-progress';

  public isLoading = false;
  public showCorsMessage = false;
  public corsLink = "https://cors-anywhere.herokuapp.com/corsdemo";
  public form: FormGroup;
  public modes: HiscoreMode[];
  public isProduction = environment.production;

  private sortedSkills: HiscoreSkill[] = [];
  private unsortedSkills: HiscoreSkill[] = [];

  constructor(
    private hiscoresService: HiscoresService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public colorScheme: ColorSchemeService) {
      colorScheme.load();
    }

  ngOnInit(): void {
    this.modes = HiscoreModes.getAll();
    this.form = this.formBuilder.group({
      username: [!this.isProduction ? 'perterter' : null, Validators.required],
      mode: HiscoreModes.STANDARD.slug,
      showPercent: false,
      sortSkills: false,
    });
  }

  public submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.getSkills();
  }

  public isCurrentlyDark(): boolean {
    return this.colorScheme.currentActive() === 'dark';
  }

  public toggleColorScheme() {
    this.colorScheme.update(this.isCurrentlyDark() ? 'light' : 'dark');
  }

  get skills(): HiscoreSkill[] {
    return this.form.get('sortSkills').value ?
      this.sortedSkills :
      this.unsortedSkills;
  }

  private sortSkills(skills: HiscoreSkill[]): HiscoreSkill[] {
      const sorted = Object.assign([], skills);
      const overall = sorted.shift();

      sorted.sort((a, b) => a.Percent < b.Percent ? 1 : -1);
      sorted.unshift(overall);

      return sorted;
  }

  private getSkills(): void {
    const username = this.form.get('username').value;
    const mode = this.form.get('mode').value;
    if (!username) {
      this.snackBar.open('You must specify a username');
      return;
    }

    this.isLoading = true;
    this.showCorsMessage = false;

    this.hiscoresService.GetSkills(username, mode).pipe(
        tap((skills: HiscoreSkill[]) => this.setSkills(skills)),
        catchError((error: any, caught: Observable<HiscoreSkill[]>) => this.handleSkillsError(error)),
        finalize(() => this.isLoading = false))
      .subscribe();
  }

  private setSkills(skills: HiscoreSkill[]): void {
    this.unsortedSkills = skills.filter(skill => !skill.Skill.nonSkill);
    this.sortedSkills = Object.assign([], this.sortSkills(this.unsortedSkills));
  }

  private handleSkillsError(error: any): ObservableInput<any> {
    this.showCorsMessage = true;

    return throwError(error);
  }
}
