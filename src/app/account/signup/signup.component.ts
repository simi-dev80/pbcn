import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

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
  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Get Started');
    this.initOnBoardingForm()
  }

  initPasswordForm() {
    this.password = true;
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required]),
    });
  }

  savePasswordForm() {
    this.password = false;
    console.log("Hello from password!");
    this.copyPBCN = true;
  }

  initOnBoardingForm() {
    this.onBoardingForm = new FormGroup({
      stepone: new FormGroup({
        country: new FormControl('', [Validators.required])
      }),
      steptwo: new FormGroup({
        country: new FormControl('', [Validators.required])
      }),
      stepthree: new FormGroup({
        country: new FormControl('', [Validators.required])
      }),
      stepfour: new FormGroup({
        country: new FormControl('', [Validators.required])
      }),
      stepfive: new FormGroup({
        country: new FormControl('', [Validators.required])
      }),
    })
  }

  saveOnboardingForm() {
    this.setupCompleted = true;
    console.log(this.onBoardingForm.value);
  }

  moveNext(val: number) {
    this.stepCount += val;
  }

}
