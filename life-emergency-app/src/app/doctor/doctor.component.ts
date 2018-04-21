import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  menu_state = false

  constructor() { }

  ngOnInit() {
  }

  toggleMenu(){
    this.menu_state = !this.menu_state; 
  }

}
