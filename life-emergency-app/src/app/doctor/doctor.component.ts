import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  menu_state = false

  constructor(private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('role') != 'DOCTOR'){
      this.router.navigate(['/doctor-dashboard'])
    }
  }

  toggleMenu(){
    this.menu_state = !this.menu_state; 
  }

  logout(){
    localStorage.removeItem('DocID');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }

}
