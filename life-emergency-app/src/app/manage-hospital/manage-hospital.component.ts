import { Component, OnInit } from '@angular/core';

import { Hospital } from '../hospital.module';
import { DbOperationsService } from '../db-operations.service';
import { v4 as uuid } from 'uuid';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-manage-hospital',
  templateUrl: './manage-hospital.component.html',
  styleUrls: ['./manage-hospital.component.scss']
})
export class ManageHospitalComponent implements OnInit {
  model = new Hospital(null, null, null, null, null,null);

  constructor(private db :DbOperationsService, private http: Http) {
    this.loadHospitals();
   }

  hospitals: any[] = [];

  ngOnInit() {
    $('#add-hospital').on('hide.bs.modal', function (e) {
      sessionStorage.clear();
      document.getElementById("saveHospitalForm").reset();
      console.log(sessionStorage);
    })
    
  }

  saveHospital(){

    if(sessionStorage.getItem("id") != null){

      this.model.method = "update";
      this.db.saveHospital(this.model);
      this.loadHospitals();
      document.getElementById("saveHospitalForm").reset();
      alert("Update Successfull");

    }else{
      this.model.id = uuid();
      this.model.method = "insert";
      this.db.saveHospital(this.model);
      this.loadHospitals();
      document.getElementById("saveHospitalForm").reset();
      alert("Insert new hospital record successfull");
      this.toggleUserModal("add-hospital")
      
    }
  }
  

  editHospital(hospital :Hospital){

    console.log(hospital);
    this.toggleUserModal("add-hospital")
    this.model = hospital;
    sessionStorage.setItem("id",this.model.id);

    
  }

  deleteHospital(hospital :Hospital){
    var r = confirm("Are you sure you want to delete this");
    console.log(hospital)
    if (r == true) {
      hospital.method="delete";
      this.db.saveHospital(hospital);
      this.loadHospitals();
    } else {
      
    }

  }

  loadHospitals() {
    this.db.getHospitals().subscribe(
      (response: Response) => {
        this.hospitals = response.json();
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

}
 