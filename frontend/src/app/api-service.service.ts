import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
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


  getDataBasedOnSkill(skill: string): Observable<any> {
    return this.http.get(`${this.api}/getDataBasedOnSkill?skill=${skill}`);
  }
  

}
