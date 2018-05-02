import { Component, OnInit } from '@angular/core';

import { DbOperationsService } from '../db-operations.service';
import { Http,Response, Headers } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  doctors: any[] = [];

  constructor(private db:DbOperationsService, private http: Http) { 
    // db.getDoctors().subscribe(
    //   (response: Response)=>{
    //     this.doctors = response.json();
    //     console.log(this.doctors);
    //   },
    //   (error) =>{
    //     console.log(error);
    //   }
    // )
  }

  test(){
    this.db.getDoctors().subscribe(
      (response: Response)=>{
        this.doctors = response.json();
        console.log(this.doctors);
      },
      (error) =>{
        console.log(error);
      }
    )
  }

  ngOnInit() {
    this.test();
  }

}
