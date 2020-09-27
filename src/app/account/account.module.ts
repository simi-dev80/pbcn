import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountService } from '../services/account.service';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SigninComponent, SignupComponent, ForgotPasswordComponent, AccountLayoutComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  providers: [AccountService]
})
export class AccountModule { }
