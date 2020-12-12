import { Component, OnInit } from '@angular/core';
import { HiscoresService } from './hiscores/hiscores.service';
import { HiscoreSkill } from './hiscores/hiscore-skill';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HiscoreMode, HiscoreModes } from './hiscores/hiscoremodes.model';
import { MatSnackBar } from '@angular/material';
import { finalize, tap } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'osrs-progress';

  public skills: HiscoreSkill[];
  public isLoading = false;
  public form: FormGroup;
  public modes: HiscoreMode[];
  public isProduction = environment.production;

  constructor(private hiscoresService: HiscoresService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.modes = HiscoreModes.getAll();
    this.form = this.formBuilder.group({
      username: ['perterter', Validators.required],
      mode: HiscoreModes.SEASONAL.slug
    });
  }

  public submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.populateSkills();
  }

  private populateSkills(): void {
    const username = this.form.get('username').value;
    const mode = this.form.get('mode').value;
    if (!username) {
      this.snackBar.open('You must specify a username');
      return;
    }

    this.isLoading = true;

    this.hiscoresService.GetSkills(username, mode).pipe(
        tap((skills: HiscoreSkill[]) => this.skills = skills.filter(skill => !skill.Skill.nonSkill)),
        finalize(() => this.isLoading = false))
      .subscribe();
  }
}
