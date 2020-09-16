import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { LoginActivityComponent } from './login-activity/login-activity.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'confirm-registration',
    component: RegisterComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'login-activity',
        component: LoginActivityComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
