import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HiscoresService {

  private CORS_ANYWHERE: string = "https://cors-anywhere.herokuapp.com/"
  private HISCORES_URL: string = "https://services.runescape.com/m=hiscore_oldschool/index_lite.ws";
  private PLAYER_PARAM: string = "player";

  constructor(private http: HttpClient) {

  }

  public getSkills(playerName: string): Observable<any> {
    let params = new HttpParams().set(this.PLAYER_PARAM, playerName);
    let httpOptions = {
      params: params,
      responseType: 'text/html' as "json"
    }
    return this.http.get(this.CORS_ANYWHERE + this.HISCORES_URL, httpOptions);
  }
}
