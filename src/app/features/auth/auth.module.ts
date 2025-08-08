import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { SignUpComponent } from './presentation/sign-up/sign-up.component';
import { AccountComponent } from './account/account.component';
import { ForgotPasswordComponent } from './presentation/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './presentation/reset-password/reset-password.component';
import { LoginComponent } from './presentation/login/login.component';
import { SharedModule } from 'src/app/shared/share.module';
import { AccountPopUpComponent } from './presentation/account-pop-up/account-pop-up.component';


const routes: Routes = [{ path: '', component: AccountComponent,  data: { roles: [] },children: [
{path:'',redirectTo: 'login', pathMatch: 'full'},
{path:'login', component: LoginComponent,  data: { roles: 'login'}},
{path:'sign-up', component: SignUpComponent,data: { roles: 'sign-up'}},
{path: 'forgot-password', component: ForgotPasswordComponent,data: { roles: 'forgot-password'}},
{path: 'reset-password', component: ResetPasswordComponent,data: { roles: 'reset-password'}}]}];

@NgModule({
  declarations: [
    AccountComponent,
    SignUpComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AccountPopUpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { } 