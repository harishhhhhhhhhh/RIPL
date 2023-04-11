import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { PlayerSelectionComponentComponent } from './player-selection-component/player-selection-component.component';
import { TeamDetailsComponentComponent } from './team-details-component/team-details-component.component';
import { RegistLoginComponent } from './regist-login/regist-login.component';
import { LoginComponent } from './regist-login/login/login.component';

import { AdminControllsComponentComponent } from './admin-controlls-component/admin-controlls-component.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:"home", component:HomeComponentComponent},
  {path:"home/:teamName", component:TeamDetailsComponentComponent,},
  {path:"playerselection",component:PlayerSelectionComponentComponent},
  {path:"admincontrolls",component:AdminControllsComponentComponent},
 
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
