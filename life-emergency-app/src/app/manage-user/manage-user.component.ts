import { Component, OnInit } from '@angular/core';
import { DbOperationsService } from '../db-operations.service';
import { Http, Response, Headers } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Doctor } from '../doctor.module';

import 'rxjs/add/operator/map';
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
  select_doctor: any[] = [];
  body : any = [];
  hospitals: any[] = [];
  model = new Doctor(null, null, null, null, null, null, null, null, null, null, null);
  hashPassword: string;
  dtOptions: DataTables.Settings = {};
  Doctors: Doctor[] = [];
  dtTrigger: Subject<any> = new Subject();

  constructor(private db: DbOperationsService, private http: Http) {
    this.loadDoctor();
    this.fetchHospital();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.http.get('http://35.198.206.153/LEA/doctor-controller.php')
      .map(this.extractData)
      .subscribe(Doctors => {
        this.Doctors = Doctors;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });

    $(function () {
      $('#add-edit-user').on('shown.bs.modal', function (e) {
        if (sessionStorage.getItem("DocID") != null) {
          $("#saveDoctorConfirmPassword").prop('disabled', true);
          $("#saveDoctorPassword").prop('disabled', true);
          console.log(sessionStorage);
        }
      })
      $('#add-edit-user').on('hide.bs.modal', function (e) {
        sessionStorage.clear();
        document.getElementById("saveDoctorForm").reset();
        console.log(sessionStorage);
      })
    });
  }

  loadDoctor() {
    this.db.getDoctors().subscribe(
      (response: Response) => {
        this.doctors = response.json();
        //console.log(this.doctors[0]);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  addNew() {
    this.toggleUserModal("add-edit-user");
    sessionStorage.removeItem("DocID");
  }

  saveDoctor() {
    if (sessionStorage.getItem("DocID") != null) {
      //update
      this.model.method = "update";
      this.db.saveDoctor(this.model);
      this.loadDoctor();
      document.getElementById("saveDoctorForm").reset();
      alert("Update Successfull");

    } else {
      if (this.model.password == this.model.confirmPassword) {
        this.hashPassword = shajs('sha256').update(this.model.password).digest('hex');
        this.model.id = uuid();
        this.model.method = "register";
        this.model.password = this.hashPassword;
        this.db.saveDoctor(this.model);
        this.loadDoctor();
        alert("Registration Successfull");
        document.getElementById("saveDoctorForm").reset();
        this.toggleUserModal("add-edit-user");
      } else {
        alert("Your password not match. Please check again");
      }
    }
  }

  delete(doctor: Doctor) {
    var r = confirm("Are you sure you want to delete this");
    console.log(doctor)
    if (r == true) {
      doctor.method="delete";
      this.body = this.db.deleteDoctor(doctor);
      this.loadDoctor();
    } else {
      
    }

  }


  edit(id: string) {
    this.db.getDoctor(id).subscribe(
      (response: Response) => {
        this.select_doctor = response.json();
        this.model = new Doctor
          (
          this.select_doctor[0].DocID,
          this.select_doctor[0].Name,
          this.select_doctor[0].Username,
          this.select_doctor[0].Password,
          this.select_doctor[0].Password,
          this.select_doctor[0].Status,
          this.select_doctor[0].HospID,
          this.select_doctor[0].Title,
          null,
          this.select_doctor[0].role,
          this.select_doctor[0].email
          );

        sessionStorage.setItem("DocID", this.select_doctor[0].DocID);
        this.toggleUserModal("add-edit-user");
        console.log(sessionStorage.getItem("DocID"));
      },
      (error) => {
        console.log(error);
      }
    )
  }



  fetchHospital() {
    console.log("from fetch hospital function");
    this.db.getHospitals().subscribe(
      (response: Response) => {
        this.hospitals = response.json();
        // console.log(this.hospitals[0]);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  toggleUserModal(modalName: string) {
    $(function () {
      $('#' + modalName).modal('toggle');
    });
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

}
