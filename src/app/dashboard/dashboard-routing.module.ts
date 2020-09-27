import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { ApplicationsComponent } from './applications/applications.component';
import { BackgroundCheckComponent } from './background-check/background-check.component';
import { ClearanceCertificateComponent } from './clearance-certificate/clearance-certificate.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'applications',
        component: ApplicationsComponent,
      },
      {
        path: 'background-check',
        component: BackgroundCheckComponent,
      },
      {
        path: 'clearance-certificate',
        component: ClearanceCertificateComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
