import { Component, OnInit } from '@angular/core';
import { DbOperationsService } from '../db-operations.service';
import { Http,Response, Headers } from '@angular/http';

import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

    //declare doctor array
    doctors: any[] = [];

    constructor(private db:DbOperationsService, private http: Http) {
      db.getDoctors().subscribe(
        (response: Response) =>{
          this.doctors = response.json();
          console.log(this.doctors[0]);
        },
        (error) =>{
          console.log(error);
        }
      )
     }

  ngOnInit() {
  }

  log(x){
    console.log();
  }

}
