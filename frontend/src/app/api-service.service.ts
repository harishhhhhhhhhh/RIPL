import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {



  api:string='http://127.0.0.1:8000';
  temp:any;

  constructor(private http:HttpClient) { }


  getAllData():Observable<any>{
    
    return this.http.get(this.api+`/getData`);
  }


  getTeams():Observable<any>{
    return this.http.get(`${this.api}/getTeams`);
  }
  getDataBasedOnSkill(skill: string): Observable<any> {
    return this.http.get(`${this.api}/getDataBasedOnSkill?skill=${skill}`);
  }
  
  assignTeamToThePlayer(id :number ,teamName:any ): Observable<any> {
    return this.http.put(`${this.api}/assignTeam?id=${id}`,{teamName :teamName});
  }

  getDataBasedOnTeam(teamName: string): Observable<any>{
    const options = { params: { teamName: teamName } };
    return this.http.get(this.api+`/getDataBasedOnTeam`,options);
  }

  getPlayerTeam(): Observable<any>{
    return this.http.get(this.api+`/checkTeam`);
  }
}
