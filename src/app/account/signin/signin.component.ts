import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import { NotifierService } from 'angular-notifier';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  loader = false;
  faSpinner = faSpinner;
  errorFeedback = '';
  constructor(private account: AccountService, private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Welcome! Sign In');
    this.initSigninForm();
  }

  initSigninForm() {
    this.signinForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  saveSignInForm() {
    this.loader = true;
    this.errorFeedback = '';
    this.account.login(this.signinForm.value).subscribe(res => {
      // this.loader = false;
      this.router.navigate(['/dashboard']);
    }, err => {
      this.loader = false;
      this.errorFeedback = err.error.message;
      this.signinForm.get('password').setValue('');
    });
  }

}
