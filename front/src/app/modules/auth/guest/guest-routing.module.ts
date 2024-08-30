import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './pages/guest.component';
import { PatientExamsComponent } from './components/patient-exams/patient-exams.component';
import { PatientReportsComponent } from './components/patient-reports/patient-reports.component';
import { patientGuard } from 'src/app/shared/guards/patient.guard';

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
  },
  {
    path: 'patient-exams',
    component: PatientExamsComponent,
    canActivate: [patientGuard]
  },
  {
    path: 'patient-reports',
    component: PatientReportsComponent,
    canActivate: [patientGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GuestRoutingModule { }
