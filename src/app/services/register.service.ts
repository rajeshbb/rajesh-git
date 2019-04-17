import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {  RegisterModel } from '../models/registermodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  getallusers(): any {
    throw new Error("Method not implemented.");
  }
 
  apiUrl: string = "http://localhost:8000/register1"

  constructor(private htc: HttpClient) { }
  adduser(rObj: RegisterModel): Observable<any> {
    const reqHeaders = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.htc.post(this.apiUrl, JSON.stringify(rObj), reqHeaders)
  }
}
