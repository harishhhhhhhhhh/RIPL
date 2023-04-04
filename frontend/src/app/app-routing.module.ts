import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { PlayerSelectionComponentComponent } from './player-selection-component/player-selection-component.component';
import { TeamDetailsComponentComponent } from './team-details-component/team-details-component.component';

const routes: Routes = [
  {path:"",component:HomeComponentComponent},
  
  {path:"playerselection",component:PlayerSelectionComponentComponent},
  {path:":teamName", component:TeamDetailsComponentComponent},
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
