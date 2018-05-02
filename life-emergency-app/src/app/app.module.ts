import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { HttpModule  } from '@angular/http';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageHospitalComponent } from './manage-hospital/manage-hospital.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { DbOperationsService } from './db-operations.service';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ManageHospitalComponent,
    ManageUserComponent,
    
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [DbOperationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
