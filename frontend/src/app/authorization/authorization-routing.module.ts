import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {changePasswordGuard} from "../guards/change-password.guard";
import { EmailResetComponent } from './components/email-reset/email-reset.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [changePasswordGuard]},
  {path: 'email-reset', component: EmailResetComponent},
  {path: '', redirectTo: 'login', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }