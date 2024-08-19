import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './pages/patients/patients.component';
import { AddPatientsComponent } from './pages/add-patients/add-patients.component';


@NgModule({
  declarations: [PatientsComponent, AddPatientsComponent],
  imports: [
    CommonModule, SharedModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
