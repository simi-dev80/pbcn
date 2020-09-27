import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  loader = false;
  constructor(private account: AccountService, private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Welcome! Sign In');
    this.initSigninForm();
  }

  initSigninForm() {
    this.signinForm = new FormGroup({
      pbcnNumber: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  saveSignInForm() {
    this.router.navigate(['/dashboard'])
    // this.loader = true;
    // this.account.signIn(this.signinForm.value).subscribe(res => {
    //   // this.loader = false;
    //   this.router.navigate(['/dashboard']);
    // }, err => {
    //   this.loader = false;
    //   console.log(err.error);
    // });
  }

}
