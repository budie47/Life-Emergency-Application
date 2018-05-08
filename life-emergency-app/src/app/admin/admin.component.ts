import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Route, Router } from '@angular/router';
import { DoctorComponent } from '../doctor/doctor.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  menu_state = false

  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    console.log("this from admin component")
  }

  toggleMenu(){
    this.menu_state = !this.menu_state; 
  }

  showManageHospital(){
    this.router.navigate(['manage-hospital'],{relativeTo:this.route});
  }

  showManageUser(){
    this.router.navigate(['manage-user'],{relativeTo:this.route});
  }

  logout(){
    localStorage.removeItem('DocID');
    this.router.navigate(['/']);
  }

}
