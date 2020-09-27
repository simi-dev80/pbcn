import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoint } from '../utils/endpoint';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private endpoint: Endpoint) { }

  signIn(data: any): Observable<any> {
    return this.http.post(this.endpoint.signin, data);
  }

  signUp(data: any): Observable<any> {
    return this.http.post(this.endpoint.signup, data);
  }

  forgot_password(data: any): Observable<any> {
    return this.http.post(this.endpoint.forgot_password, data);
  }

  reset_password(data: any): Observable<any> {
    return this.http.post(this.endpoint.reset_password, data);
  }
}
