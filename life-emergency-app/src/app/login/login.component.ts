import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  state = [false,false];
  

  constructor() { }

  ngOnInit() {

  }

  focusFunction(id){
    this.state[id] = true;
  }
  
  focusOutFunction(id){
    this.state[id] = false;
  }

}
