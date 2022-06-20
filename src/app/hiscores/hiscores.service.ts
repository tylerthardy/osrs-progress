import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HiscoreOverall, HiscoreSkill } from './hiscore-skill';
import { DebugHiscores } from './hiscore.debug';
import { Skill } from './skill.enum';

@Injectable({
  providedIn: 'root',
})
export class HiscoresService {
  private HISCORES_URL = 'https://ipm42m3utb.execute-api.us-east-1.amazonaws.com/prod/hiscores/{{MODE}}/{{USERNAME}}';

  private debugSkills = DebugHiscores;

  constructor(private http: HttpClient) {}

  public getSkills(playerName: string, modeSlug: string): Observable<HiscoreSkill[]> {
    return this.fetchHiscores(playerName, modeSlug).pipe(map((response) => this.transformToSkills(response)));
  }

  private fetchHiscores(playerName: string, modeSlug: string): Observable<string> {
    if (!environment.production) {
      if (!this.debugSkills[modeSlug]) {
        modeSlug = 'normal';
      }
      return of(this.debugSkills[modeSlug]).pipe(delay(2000));
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

    const hiscoreSkills: HiscoreSkill[] = [];

    Skill.AllSkills.forEach((skill, i) => {
      const csv = responseLines[i];
      let hiscoreSkill: HiscoreSkill;
      if (skill.Name === 'Overall') {
        hiscoreSkill = new HiscoreOverall(hiscoreSkills, csv);
      } else {
        hiscoreSkill = new HiscoreSkill(skill, csv);
      }
      hiscoreSkills.push(hiscoreSkill);
    });

    return hiscoreSkills;
  }
}
