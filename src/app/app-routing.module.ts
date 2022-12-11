import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './compnents/forget-password/forget-password.component';
import { LoginComponent } from './compnents/login/login.component';
import { ProfileComponent } from './compnents/profile/profile.component';
import { SignupComponent } from './compnents/signup/signup.component';
import { UpdateNameComponent } from './compnents/update-name/update-name.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  { path:'forget-password',component: ForgetPasswordComponent},
  {path:'name',component:UpdateNameComponent},
  {path:'profile',component:ProfileComponent},
  { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
