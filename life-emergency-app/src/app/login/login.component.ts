import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DbOperationsService } from '../db-operations.service';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import * as shajs from 'sha.js';

import { Doctor } from '../doctor.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = new Doctor(null,null,null,null,null,null,null,null,null);
  hashPassword : string;
  body : any = [];

  constructor(private db:DbOperationsService, private http: Http, private router:Router) { }

  ngOnInit() {

  }

  login(){
    this.hashPassword = shajs('sha256').update(this.model.password).digest('hex');
    this.model.method = "login";
    this.model.password = this.hashPassword;
    this.body = this.db.loginDoctor(this.model).subscribe(
      (val:any)=>{
        this.body = JSON.parse(val._body);
        if(this.body[0] == undefined){
          alert("Username and password incorrect");
        }else{
          localStorage.setItem('DocID',this.body[0].DocID);
          if(this.body[0].role == "ADMINISTRATOR"){
            this.router.navigate(['admin-dashboard']);
            localStorage.setItem('role',"ADMINISTRATOR");
          }else{
            this.router.navigate(['doctor-dashboard']);
            localStorage.setItem('role',"DOCTOR");
          }
        }
      },
        response => {
          console.log("POST call in error", response);
        },
        () =>{
          console.log("POST call in error");
        }
      
    )
    console.log(this.model);
    
    
  }
}
