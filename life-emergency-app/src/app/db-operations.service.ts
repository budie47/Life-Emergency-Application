import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class DbOperationsService {

  apiURL = "http://35.198.206.153/LEA/";
  body :any =  [];
  moduleURL :string;

  constructor(private http: Http) { }
  //Get all S
  getDoctors() {
    const headers = new Headers();
    this.moduleURL =  this.getControllerURL("doctor");

    headers.append("Cache-Control", "no-cache");
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST');
    headers.append('Access-Control-Max-Age', '1728000');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.apiURL+this.moduleURL);
  }

  loginDoctor(doctor: any){
    
    return this.http.post(this.apiURL, doctor);

  }

  saveDoctor(doctor: any){
    //console.log("this from db services");
    //console.log(doctor);
    this.moduleURL =  this.getControllerURL("doctor");
    const headers = new Headers();
    headers.append("Cache-Control", "no-cache");
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST');
    headers.append('Access-Control-Max-Age', '1728000');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    console.log(doctor);

    this.http.post(this.apiURL+this.moduleURL,doctor)
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

  getHospitals() {
    const headers = new Headers();
    this.moduleURL =  this.getControllerURL("hospital");

    headers.append("Cache-Control", "no-cache");
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST');
    headers.append('Access-Control-Max-Age', '1728000');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.apiURL+this.moduleURL);
  }


  getControllerURL(module:string){
    if(module == "doctor"){
      return "doctor-controller.php";
    }else if(module == "hospital"){
      return "hospital-controller.php";
    }else if(module == "public-user"){
      return "public-user-controller.php";
    }else{
      console.log("no module selected");
      return "no-module selected";

    }
  }
}
