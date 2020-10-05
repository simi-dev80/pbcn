import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Endpoint {
  public baseUrl = environment.apiUrl;
  // list of countries
  countries = 'http://geodata.solutions/api/api.php?type=getCountries';
  // get ip address info
  ipinfo = 'https://ipapi.co/json/';
  // login
  login = this.baseUrl + 'Auth/Login';
  // Generate PBCN
  generate_applicant = this.baseUrl + 'Applicant/ApplyPbcn';
  // Fetch Identity
  fetch_identity_types = this.baseUrl + 'Identification/IdentityType';
  // Identification
  query_identity_server = this.baseUrl + 'Identification/Identitify';
  // User EXIST
  user_exist = this.baseUrl + 'Identification/Check';
  // Send OTP
  send_otp = this.baseUrl + 'Notification/Otp';
  // Verify OTP
  verify_otp = this.baseUrl + 'Notification/VerifyOtp';
  // Fetch User Payments
  fetch_user_payments = this.baseUrl + 'Payment/UserPayments';
  // Status Code
  status_code = this.baseUrl + 'StatusCode';
  // Status Code Category
  status_code_category = this.baseUrl + 'StatusCode/Category';
}
