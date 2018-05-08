import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { HttpModule  } from '@angular/http';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageHospitalComponent } from './manage-hospital/manage-hospital.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { DbOperationsService } from './db-operations.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth.guard';





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
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [DbOperationsService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
