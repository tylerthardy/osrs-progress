import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HiscoreSkill } from './hiscore-skill';
import { Skill } from './skill.enum';
import { DebugHiscores } from './hiscore.debug';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HiscoresService {
  private HISCORES_URL = 'https://dqqgdoqhv9.execute-api.us-east-1.amazonaws.com/prod/hiscores/{{MODE}}/{{USERNAME}}';

  private debugSkills = DebugHiscores;

  constructor(private http: HttpClient) {}

  public getSkills(playerName: string, modeSlug: string): Observable<HiscoreSkill[]> {
    return this.fetchHiscores(playerName, modeSlug).pipe(map((response) => this.transformToSkills(response)));
  }

  private fetchHiscores(playerName: string, modeSlug: string): Observable<string> {
    if (!environment.production) {
      return of(this.debugSkills).pipe(delay(2000));
    }
    const httpOptions = {
      responseType: 'text/html' as 'json',
    };
    let url = this.HISCORES_URL.replace('{{MODE}}', modeSlug);
    url = url.replace('{{USERNAME}}', playerName);
    return this.http.get<string>(url, httpOptions);
  }

  private transformToSkills(response: string): HiscoreSkill[] {
    const responseLines = response.split('\n');

    const hiscoreSkills: HiscoreSkill[] = Skill.AllSkills.map((skill, i) => {
      const csv = responseLines[i];
      return this.getHiscoreSkillFromCsv(skill, csv);
    });

    const overall = hiscoreSkills.find((skill) => skill.Skill === Skill.Overall);
    overall.Percent = this.getOverallPercentComplete(hiscoreSkills);

    return hiscoreSkills;
  }

  private getHiscoreSkillFromCsv(skill: Skill, csv: string): HiscoreSkill {
    const tokens = csv.split(',');
    const rank = parseInt(tokens[0], 10);
    const level = parseInt(tokens[1], 10);
    const xp = tokens.length > 2 ? parseInt(tokens[2], 10) : null;
    const percent = skill !== Skill.Overall ? this.getSkillPercentComplete(xp) : null;

    const hiscoreSkill: HiscoreSkill = {
      Skill: skill,
      Rank: rank,
      Level: level,
      Xp: xp,
      Percent: percent,
    };

    if (skill.nonSkill) {
      hiscoreSkill.Xp = level;
    }

    return hiscoreSkill;
  }

  private getSkillPercentComplete(xp: number): number {
    let percent = (xp / Skill.MAX_XP) * 100;
    if (percent > 100) {
      percent = 100;
    }
    return percent;
  }

  private getOverallPercentComplete(skills: HiscoreSkill[]) {
    let totalXp = 0;
    skills.forEach((skill) => {
      if (skill.Skill === Skill.Overall || skill.Skill.nonSkill) {
        return;
      }
      totalXp += skill.Xp > Skill.MAX_XP ? Skill.MAX_XP : skill.Xp;
    });
    const percent = totalXp / (Skill.NUMBER_OF_SKILLS * Skill.MAX_XP);
    return percent * 100;
  }
}
