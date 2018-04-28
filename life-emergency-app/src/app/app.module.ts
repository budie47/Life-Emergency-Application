import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import {HttpClientModule, HttpClient} from '@angular/common/http';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageHospitalComponent } from './manage-hospital/manage-hospital.component';
import { ManageUserComponent } from './manage-user/manage-user.component';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ManageHospitalComponent,
    ManageUserComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule
 
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
