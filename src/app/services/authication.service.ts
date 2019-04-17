import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthicationService {
  apiUrl : string ="http://localhost:8000/user/login"
  constructor(private htc:HttpClient) { }
  AuthicateUser(u: string, p : string): Observable<any>{
    const reqHeaders = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
   return  this.htc.post(this.apiUrl,{"username":u, "password": p}, reqHeaders)
  }
}

