import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageHospitalComponent } from './manage-hospital/manage-hospital.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'admin-dashboard',
        component:AdminComponent,
        canActivate:[AuthGuard],
        children: [
            {
                path:'manage-hospital',
                component: ManageHospitalComponent
            },
            {
                path:'manage-user',
                component:ManageUserComponent,
                
            }
        ]
    },
    {
        path:'doctor-dashboard',
        canActivate:[AuthGuard],
        component:DoctorComponent
    },
    { 
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
]

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })

  export class AppRoutingModule { }

  export const routingComponents = [LoginComponent,RegisterComponent,AdminComponent,DoctorComponent,ManageHospitalComponent,ManageUserComponent]