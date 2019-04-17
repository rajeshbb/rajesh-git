import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterModel } from '../models/registermodel';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Register2Service {
  apiUrl: string = "http://localhost:8000/register"
  constructor(private htc:HttpClient, private rService: RegisterService, private rtr: Router) { }

  getallusers(): Observable<any> {
    return this.htc.get(this.apiUrl, { responseType: 'json' })
  }

  getbyusername(i):Observable<any> {

    return this.htc.get(this.apiUrl+'/'+i,{responseType:'json'})
   }

  deletebyuser(username: string): Observable<any> {
    
    return this.htc.delete(this.apiUrl + '/' + username, { responseType: 'json' })

  }

  edituser(rObj:RegisterModel): Observable<any> { 
    const reqHeaders = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.htc.put(this.apiUrl,JSON.stringify(rObj), reqHeaders)
  }
}
