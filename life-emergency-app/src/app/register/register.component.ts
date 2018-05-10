import { Component, OnInit } from '@angular/core';

import { DbOperationsService } from '../db-operations.service';
import { Http,Response, Headers } from '@angular/http';

import { FormGroup, FormControl, Validators} from '@angular/forms';

import * as shajs from 'sha.js';

import { v4 as uuid } from 'uuid';

import { Doctor } from '../doctor.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  doctors: any[] = [];
  hashPassword: string;

  model = new Doctor(null,null,null,null,null,null,null,null,null);

  constructor(private db:DbOperationsService, private http: Http, private router:Router) { 

  }
  ngOnInit() {


  }

  register(){

    if(this.model.password == this.model.confirmPassword){

      this.hashPassword = shajs('sha256').update(this.model.password).digest('hex');
      this.model.status = "DOCTOR";
      this.model.id = uuid();
      this.model.method = "register";
      this.model.password = this.hashPassword;
      this.db.saveDoctor(this.model);
      alert("Registration Successfull")
      this.router.navigate(['login']);

    }else{
      alert("Your password not match. Please check again");
    }

    


  }

}
