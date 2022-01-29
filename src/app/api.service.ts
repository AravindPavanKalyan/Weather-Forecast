import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(protected http: HttpClient) {}

  currentForCast(zip: string){
    return this.http.get(`weather?zip=${zip},us&appid=${environment.apiId}`);  
  }

  getFiveDaysForCast(zip: string){
    return this.http.get(`forecast?zip=${zip},us&appid=${environment.apiId}`);   
  }

}
