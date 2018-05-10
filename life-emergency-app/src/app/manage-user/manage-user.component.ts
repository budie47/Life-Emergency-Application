import { Component, OnInit } from '@angular/core';
import { DbOperationsService } from '../db-operations.service';
import { Http,Response, Headers } from '@angular/http';

import { FormGroup, FormControl, Validators} from '@angular/forms';

import { Doctor } from '../doctor.module';


import * as shajs from 'sha.js';

import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

    //declare doctor array
    doctors: any[] = [];
    hospitals: any[] = [];
    model = new Doctor(null,null,null,null,null,null,null,null,null);
    hashPassword:string;
    saveDoctorFormGroup: FormGroup;

    constructor(private db:DbOperationsService, private http: Http) {
      db.getDoctors().subscribe(
        (response: Response) =>{
          this.doctors = response.json();
          
          //console.log(this.doctors[0]);
        },
        (error) =>{
          console.log(error);
        }
      )
     }

  ngOnInit() {
  }

  loadDoctor(){
    this.db.getDoctors().subscribe(
      (response: Response) =>{
        this.doctors = response.json();
        console.log(this.doctors[0]);
      },
      (error) =>{
        console.log(error);
      }
    )
  }

  saveDoctor(){
    if(this.model.password == this.model.confirmPassword){

      this.hashPassword = shajs('sha256').update(this.model.password).digest('hex');
      this.model.id = uuid();
      this.model.method = "register";
      this.model.password = this.hashPassword;
      this.db.saveDoctor(this.model);
      alert("Registration Successfull");
      this.model = new Doctor(null,null,null,null,null,null,null,null,null);
      this.saveDoctorFormGroup.markAsPristine();
    
    }else{
      alert("Your password not match. Please check again");
    }
  }

  fetchHospital(){
    console.log("from fetch hospital function");
    this.db.getHospitals().subscribe(
      (response: Response) =>{
        this.hospitals = response.json();
        console.log(this.hospitals[0]);
      },
      (error) =>{
        console.log(error);
      }
    )
  }

}
