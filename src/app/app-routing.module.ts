import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: 'login',
    data: {
      breadcrumb: 'Login',
    },
    component: LoginComponent
  },
  {
    path: 'home',
    data: {
      breadcrumb: 'Početna',
    },
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
