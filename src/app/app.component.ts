import { Component, OnInit } from '@angular/core';
import { HiscoresService } from './hiscores/hiscores.service';
import { HiscoreSkill } from './hiscores/hiscore-skill';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HiscoreMode, HiscoreModes } from './hiscores/hiscoremodes.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'osrs-progress';

  public skills: HiscoreSkill[];
  public blurred: boolean;

  public form: FormGroup;
  public modes: HiscoreMode[];

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

    this.hiscoresService.GetSkills(username, mode).subscribe((response: string) => {
      this.skills = this.hiscoresService.GetHiscoreSkills(response);
      this.blurred = false;
    });
  }
}
