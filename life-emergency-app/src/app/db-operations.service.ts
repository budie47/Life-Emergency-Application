import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class DbOperationsService {

  apiURL = "http://192.168.43.125/LEA/doctor-controller.php";

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


}
