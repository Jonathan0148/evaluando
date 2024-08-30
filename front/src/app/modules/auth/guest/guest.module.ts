import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './pages/guest.component';
import { AuthService } from '../services/auth.service';
import { GuestRoutingModule } from './guest-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientExamsComponent } from './components/patient-exams/patient-exams.component';
import { PatientReportsComponent } from './components/patient-reports/patient-reports.component';
import { AddExamsComponent } from './components/add-exams/add-exams.component';
import { AddReportsComponent } from './components/add-reports/add-reports.component';

@NgModule({
  declarations: [
    GuestComponent, 
    PatientExamsComponent, 
    PatientReportsComponent, 
    AddExamsComponent, 
    AddReportsComponent,
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    SharedModule
  ],
  providers:[ AuthService ]
})
export class GuestModule { }
