import { Component } from '@angular/core';
import { HiscoresService } from './hiscores/hiscores.service';
import { HiscoreSkill } from './hiscores/hiscore-skill';
import { Skill } from './hiscores/skill.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'osrs-progress';

  public theSkill: HiscoreSkill = {
    Skill: Skill.Woodcutting,
    Rank: 1,
    Level: 99
  };

  public skills: HiscoreSkill[];

  constructor(private hiscoresService: HiscoresService) { }

  ngOnInit(): void {
    this.hiscoresService.GetSkills("perterter").subscribe((response: string) => {
      this.skills = this.hiscoresService.GetHiscoreSkills(response);
      this.theSkill.Xp = this.skills.filter(skill=>skill.Skill.Name == "Woodcutting")[0].Xp;
    });
  }
}
