import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoint } from '../utils/endpoint';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private endpoint: Endpoint) { }

  login(data: any): Observable<any> {
    return this.http.post(this.endpoint.login, data);
  }

  fetchcountries(): Observable<any> {
    return this.http.get(this.endpoint.countries);
  }

  getIpInfo(): Observable<any> {
    return this.http.get(this.endpoint.ipinfo);
  }

  fetchIdentityTypes(): Observable<any> {
    return this.http.get(this.endpoint.fetch_identity_types);
  }

  checkuserexist(data: any): Observable<any> {
    return this.http.post(this.endpoint.user_exist, data);
  }

  queryserver(data: any): Observable<any> {
    return this.http.post(this.endpoint.query_identity_server, data);
  }

  sendOtp(data: any): Observable<any> {
    return this.http.post(this.endpoint.send_otp, data);
  }

  verifyOtp(data: any): Observable<any> {
    return this.http.post(this.endpoint.verify_otp, data);
  }

  applyForPBCN(data: any): Observable<any> {
    return this.http.post(this.endpoint.generate_applicant, data);
  }

}
