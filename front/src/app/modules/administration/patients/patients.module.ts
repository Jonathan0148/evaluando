import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { PatientsRoutingModule } from './patients-routing.module';
import { AddPatientsComponent } from './components/add-patients/add-patients.component';
import { AddExamsComponent } from './components/add-exams/add-exams.component';
import { AddReportsComponent } from './components/add-reports/add-reports.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { ReportsComponent } from './pages/reports/reports.component';


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
