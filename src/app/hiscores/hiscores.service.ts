
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HiscoreSkill } from './hiscore-skill';
import { Skill } from './skill.enum';
import { DebugHiscores } from './hiscore.debug';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HiscoresService {

  private CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';
  private HISCORES_URL = 'https://secure.runescape.com/m={{MODE}}/index_lite.ws';
  private PLAYER_PARAM = 'player';

  private debugSkills = DebugHiscores;

  constructor(private http: HttpClient) { }

  public GetSkills(playerName: string, modeSlug: string): Observable<HiscoreSkill[]> {
    return this.FetchHiscores(playerName, modeSlug).pipe(
      map(response => this.TransformToSkills(response))
    );
  }

  private FetchHiscores(playerName: string, modeSlug: string): Observable<string> {
    if (!environment.production) {
      return of(this.debugSkills);
    }
    const httpParams = new HttpParams().set(this.PLAYER_PARAM, playerName);
    const httpOptions = {
      params: httpParams,
      responseType: 'text/html' as 'json'
    };
    const url = this.HISCORES_URL.replace('{{MODE}}', modeSlug);
    return this.http.get<string>(this.CORS_ANYWHERE + url, httpOptions);
  }

  private TransformToSkills(response: string): HiscoreSkill[] {
    const hiscoreSkills: HiscoreSkill[] = [];
    const responseLines = response.split('\n');

    Skill.AllSkills.forEach((skill, i) => {
      const csv = responseLines[i];
      const hiscoreSkill = this.getHiscoreSkillFromCsv(skill, csv);
      hiscoreSkills.push(hiscoreSkill);
    });
    return hiscoreSkills;
  }

  private getHiscoreSkillFromCsv(skill: Skill, csv: string): HiscoreSkill {
    const tokens = csv.split(',');
    const rank = parseInt(tokens[0], 10);
    const level = parseInt(tokens[1], 10);

    let xp;
    let percent;
    if (tokens.length > 2) {
      xp = tokens[2];
      if (skill === Skill.Overall) {
        percent = (xp / (Skill.MAX_XP * Skill.NUMBER_OF_SKILLS)) * 100;
      } else {
        percent = xp / Skill.MAX_XP * 100;
      }
      if (percent > 100) {
        percent = 100;
      }
    }

    const hiscoreSkill: HiscoreSkill = {
      Skill: skill,
      Rank: rank,
      Level: level,
      Xp: xp,
      Percent: percent
    };

    if (skill.nonSkill) {
      hiscoreSkill.Xp = level;
    }

    return hiscoreSkill;
  }
}
