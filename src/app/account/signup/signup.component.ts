import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotifierService } from "angular-notifier";
import { ngCopy } from 'angular-6-clipboard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  onBoardingForm: FormGroup;
  passwordForm: FormGroup;
  stepCount = 0;
  setupCompleted = false;
  password = false;
  copyPBCN = false;
  countryList = [];
  countryLoader = false;
  faSpinner = faSpinner;
  message = '';
  countryInfo: any;
  accountType = '';
  identityTypeList = [];
  identityType = [];
  identificationType: any;
  queryMessage: string;
  userInfo: any;
  pbcn = '';
  private readonly _notification: NotifierService;
  paystackRef = `${Math.ceil(Math.random() * 10e10)}`;
  constructor(private title: Title,
    private account: AccountService,
    private spinner: NgxSpinnerService,
    private notification: NotifierService) {
      this._notification = notification;
    }

  ngOnInit(): void {
    this.title.setTitle('Get Started');
    this.fetchCountries();
    this.initOnBoardingForm();
    this.fetchIdentityTypes();
  }

  fetchIdentityTypes() {
    this.account.fetchIdentityTypes().subscribe(res => {
      this.identityTypeList = res;
    }, err => {
      // this._notification.notify('error', err.error);
      Swal.fire('Error', err.error, 'error');
    });
  }

  selectAccountType(val: string) {
    this.accountType = val;
    this.onBoardingForm.get('steptwo.accounttype').setValue(val);
    this.onBoardingForm.get('steptwo.identificationnumber').setValue('');
    this.onBoardingForm.get('steptwo.identificationnumber').setValue('');
    if (this.accountType == 'Individual') {
      this.identityType = this.identityTypeList.filter(x => x.name != 'RCN');
    } else {
      this.identityType = this.identityTypeList.filter(x => x.name == 'RCN');
    }
  }

  identityTypeChange(name: string) {
    this.identificationType = this.identityTypeList.find(x => x.name == name);
  }

  getCountryFromIp(country: any) {
    this.onBoardingForm.get('stepone.country').setValue('');
    this.message = '';
    if (country) {
      const details = country.split(',');
      this.countryInfo = {code: details[0], country: details[1]};
      this.countryLoader = true;
      this.account.getIpInfo().subscribe(res => {
        this.countryLoader = false;
        if (details[0] == res.country_code) {
          this.onBoardingForm.get('stepone.country').setValue(details[1]);
        } else {
          this.message = 'You are currently not resident in <b>' + details[1] + '</b>';
          this.onBoardingForm.get('stepone.country').setValue('');
        }
      }, err => {
        this.countryLoader = false;
        // this._notification.notify('error', err.error);
        Swal.fire('Error', err.error, 'error');
      });
    }
  }

  initPasswordForm() {
    this.password = true;
    this.passwordForm = new FormGroup({
      identity: new FormGroup({
        code: new FormControl(this.identificationType?.code),
        number: new FormControl(this.onBoardingForm.get('steptwo.identificationnumber').value)
      }),
      payment: new FormGroup({
        transactionId: new FormControl(this.onBoardingForm.get('stepfive.paymentRef').value),
        status: new FormControl(2001),
        amount: new FormControl(1500),
        comment: new FormControl(''),
        paymentFor: new FormControl(3001)
      }),
      applicant: new FormGroup({
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
        firstName: new FormControl(this.userInfo?.firstName),
        lastName: new FormControl(this.userInfo?.lastName),
        otherNames: new FormControl(''),
        nationality: new FormControl(this.onBoardingForm.get('steptwo.citizenship').value),
        phone: new FormControl(this.onBoardingForm.get('stepthree.phonenumber').value),
        email: new FormControl(this.onBoardingForm.get('stepthree.emailAddress').value)
      })
    });
  }

  savePasswordForm() {
    this.queryMessage = 'Creating your account';
    this.spinner.show();
    this.account.applyForPBCN(this.passwordForm.value).subscribe(
      res => {
        console.log(res);
        this.pbcn = res.pbcn;
        // this._notification.notify('success', res.message);
        Swal.fire('Success', res.message, 'success');
        this.spinner.hide();
        this.password = false;
        this.copyPBCN = true;
      },
      err => {
        this.spinner.hide();
        // this._notification.notify('error', err.error);
        Swal.fire('Error', err.error.message, 'error');
      }
    )

  }

  initOnBoardingForm() {
    this.onBoardingForm = new FormGroup({
      stepone: new FormGroup({
        country: new FormControl(this.countryInfo?.country, [Validators.required])
      }),
      steptwo: new FormGroup({
        citizenship: new FormControl('', [Validators.required]),
        accounttype: new FormControl(this.accountType, [Validators.required]),
        identificationtype: new FormControl('', [Validators.required]),
        identificationnumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      }),
      stepthree: new FormGroup({
        phonenumber: new FormControl('', [Validators.required]),
        emailAddress: new FormControl('', [Validators.required]),
      }),
      stepfour: new FormGroup({
        otp: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')])
      }),
      stepfive: new FormGroup({
        paymentRef: new FormControl('', [Validators.required])
      }),
    })
  }

  saveOnboardingForm() {
    this.setupCompleted = true;
    // console.log(this.onBoardingForm.value);
  }

  moveNext(val: number, type: string = null) {
    // this.stepCount += val;
    if ( (this.stepCount + val) == 2 && type != 'PREV') {
      if (this.identificationType && this.onBoardingForm.get('steptwo.identificationnumber').value) {
        let serverData = {code: this.identificationType?.code, number: this.onBoardingForm.get('steptwo.identificationnumber').value };
        this.queryMessage = 'Validating your information';
        this.spinner.show();
        this.account.checkuserexist(serverData).subscribe(
          res => {
            if(!res.isExist) {
              this.queryMessage = 'Querying ' + this.identificationType?.name + ' server.'
              this.account.queryserver(serverData).subscribe(response => {
                this.userInfo = response;
                this.onBoardingForm.get('stepthree.phonenumber').setValue(this.userInfo?.phone);
                this.spinner.hide();
                this.stepCount += val;
              }, error => {
                this.spinner.hide();
                // this._notification.notify('error', error.error);
                Swal.fire('Error', error.error, 'error');
              })
            } else {
              this.userInfo = res;
              this.onBoardingForm.get('stepthree.phonenumber').setValue(this.userInfo?.phone);
              this.spinner.hide();
              this.stepCount += val;
            }
          },
          err => {
            this.spinner.hide();
            // this._notification.notify('error', err.error.message);
            Swal.fire('Error', err.error.message, 'error');
          }
        )
      }
    } else if ( (this.stepCount + val) == 3  && type != 'PREV') {
      if (this.identificationType && this.onBoardingForm.get('stepthree.phonenumber').value && this.onBoardingForm.get('stepthree.emailAddress').value) {
        let serverData = {  phone: this.onBoardingForm.get('stepthree.phonenumber').value,
                            email: this.onBoardingForm.get('stepthree.emailAddress').value,
                            identity: {
                              code: this.identificationType?.code,
                              number: this.onBoardingForm.get('steptwo.identificationnumber').value
                            }
                          };
        this.queryMessage = 'Sending OTP';
        this.spinner.show();
        this.account.sendOtp(serverData).subscribe(
          res => {
            this.spinner.hide();
            this.stepCount += val;
            // this._notification.notify('info', res.message);
            Swal.fire('Info', res.message, 'info');
          },
          err => {
            this.spinner.hide();
            // this._notification.notify('error', err.error);
            Swal.fire('Error', err.error, 'error');
          }
        )
      }
    } else if ( (this.stepCount + val) == 4  && type != 'PREV') {
      if (this.identificationType && this.onBoardingForm.get('stepthree.phonenumber').value && this.onBoardingForm.get('stepthree.emailAddress').value) {
        let serverData = {  phone: this.onBoardingForm.get('stepthree.phonenumber').value,
                            email: this.onBoardingForm.get('stepthree.emailAddress').value,
                            otp: parseInt(this.onBoardingForm.get('stepfour.otp').value, 0),
                            identity: {
                              code: this.identificationType?.code,
                              number: this.onBoardingForm.get('steptwo.identificationnumber').value
                            }
                          };
        this.queryMessage = 'Verifying OTP';
        this.spinner.show();
        this.account.verifyOtp(serverData).subscribe(
          res => {
            console.log(res);
            this.spinner.hide();
            this.stepCount += val;
            // this._notification.notify('info', res.message);
            Swal.fire('Info', res.message, 'info');
          },
          err => {
            this.spinner.hide();
            // console.log(err.error.message);
            // this._notification.notify('error', err.error.message);
            Swal.fire('Error', err.error.message, 'error');
          }
        )
      }
    } else {
      this.stepCount += val;
    }

  }

  fetchCountries() {
    this.countryLoader = true;
    this.account.fetchcountries().subscribe(res => {
      this.countryLoader = false;
      this.countryList = Object.entries(res.result);
    }, err => {
      this.countryLoader = false;
      // this._notification.notify('error', err.error);
      Swal.fire('Error', err.error, 'error');
    });
  }

  paymentDone($ev) {
    // console.log($ev);
    this.onBoardingForm.get('stepfive.paymentRef').setValue($ev.reference);
  }

  copyToClipboard(val) {
    ngCopy(val);
  }

}
