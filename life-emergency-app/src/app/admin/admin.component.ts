import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  menu_state = false

  constructor() { }

  ngOnInit() {
  }

  toggleMenu(){
    this.menu_state = !this.menu_state; 
  }

}
