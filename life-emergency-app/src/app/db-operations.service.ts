import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class DbOperationsService {

  apiURL = "http://35.198.206.153/LEA/doctor-controller.php";
  body :any =  [];

  constructor(private http: Http) { }
  //Get all S
  getDoctors() {
    const headers = new Headers();

    headers.append("Cache-Control", "no-cache");
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST');
    headers.append('Access-Control-Max-Age', '1728000');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.apiURL);
  }

  loginDoctor(doctor: any){
    
    return this.http.post(this.apiURL, doctor);

  }

  saveDoctor(doctor: any){
    //console.log("this from db services");
    //console.log(doctor);
    const headers = new Headers();
    headers.append("Cache-Control", "no-cache");
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST');
    headers.append('Access-Control-Max-Age', '1728000');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(this.apiURL,doctor)
      .subscribe(
        (val) => {
          console.log("POST call successful value return in body", val)
        },
        response => {
          console.log("POST call in error", response);
        },
        () =>{
          console.log("The POST observable is now completed.");
        }
      )
  }
}
