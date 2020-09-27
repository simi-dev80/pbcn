import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackgroundCheckComponent } from './background-check/background-check.component';
import { ClearanceCertificateComponent } from './clearance-certificate/clearance-certificate.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplicationsComponent } from './applications/applications.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AuthGuard } from '../guard/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, BackgroundCheckComponent, ClearanceCertificateComponent, ProfileComponent, ApplicationsComponent, DashboardLayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ],
  providers: [AuthGuard]
})
export class DashboardModule { }
