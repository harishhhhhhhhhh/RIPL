import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiServiceService } from './api-service.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { PlayerSelectionComponentComponent } from './player-selection-component/player-selection-component.component';
import { TeamSelectionComponentComponent } from './team-selection-component/team-selection-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { TeamDetailsComponentComponent } from './team-details-component/team-details-component.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponentComponent } from './nav-bar-component/nav-bar-component.component';
import { AdminControllsComponentComponent } from './admin-controlls-component/admin-controlls-component.component';
@NgModule({
  declarations: [
    AppComponent,
    PlayerSelectionComponentComponent,
    TeamSelectionComponentComponent,
    HomeComponentComponent,
    TeamDetailsComponentComponent,
    NavBarComponentComponent,
    AdminControllsComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,

    BrowserAnimationsModule
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
