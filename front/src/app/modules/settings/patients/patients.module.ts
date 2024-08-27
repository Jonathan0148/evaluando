import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './pages/patients/patients.component';
import { AddPatientsComponent } from './pages/add-patients/add-patients.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AddExamsComponent } from './pages/add-exams/add-exams.component';
import { AddReportsComponent } from './pages/add-reports/add-reports.component';


@NgModule({
  declarations: [
    PatientsComponent, 
    AddPatientsComponent, 
    ExamsComponent, 
    ReportsComponent,
    AddExamsComponent,
    AddReportsComponent
  ],
  imports: [
    CommonModule, SharedModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
