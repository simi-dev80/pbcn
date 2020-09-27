import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Endpoint {
  public baseUrl = environment.apiUrl;

  // authentication url
  signin = this.baseUrl + '/signin';
  signup = this.baseUrl + '/signup';
  forgot_password = this.baseUrl + '/forgot-password';
  reset_password = this.baseUrl + '/reset-password/';

}
