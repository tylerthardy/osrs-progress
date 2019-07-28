import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HiscoreSkill } from './hiscore-skill';
import { Skill } from './skill.enum';

@Injectable({
  providedIn: 'root'
})
export class HiscoresService {

  private CORS_ANYWHERE: string = "https://cors-anywhere.herokuapp.com/"
  private HISCORES_URL: string = "https://services.runescape.com/m=hiscore_oldschool/index_lite.ws";
  private PLAYER_PARAM: string = "player";

  constructor(private http: HttpClient) {

  }

  public GetSkills(playerName: string): Observable<any> {
    let params = new HttpParams().set(this.PLAYER_PARAM, playerName);
    let httpOptions = {
      params: params,
      responseType: 'text/html' as "json"
    }
    return this.http.get(this.CORS_ANYWHERE + this.HISCORES_URL, httpOptions);
  }

  public GetHiscoreSkills(response: string): HiscoreSkill[] {
    let hiscoreSkills: HiscoreSkill[] = [];
    let responseLines = response.split('\n');
    let skillNames = Object.keys(Skill);
    skillNames.forEach((skill, i) => {
      let tokens = responseLines[i].split(',');
      let rank = parseInt(tokens[0]);
      let level = parseInt(tokens[1]);
      let xp;
      if (tokens.length > 2) {
        xp = tokens[2];
      }
      let hiscoreSkill: HiscoreSkill = {
        Skill: Skill[skill],
        Rank: rank,
        Level: level,
        Xp: xp
      };
      hiscoreSkills.push(hiscoreSkill);
    });

    return hiscoreSkills;
  }
}
