import { Component } from '@angular/core';
import { HiscoresService } from './hiscores/hiscores.service';
import { HiscoreSkill } from './hiscores/hiscore-skill';
import { FormControl } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'osrs-progress';

  public skills: HiscoreSkill[];
  public username: FormControl;
  public blurred: boolean;

  constructor(private hiscoresService: HiscoresService) { }

  ngOnInit(): void {
    this.username = new FormControl();
  }

  private populateSkills(username: string): void {
    this.hiscoresService.GetSkills(username).subscribe((response: string) => {
      this.skills = this.hiscoresService.GetHiscoreSkills(response);
      this.blurred = false;
    });
  }

  public onUsernameChange(): void {
    this.blurred = true;
    if (!this.username.value) {
      this.skills = null;
      this.blurred = false;
      return;
    }

    this.populateSkills(this.username.value);
  }
}
