import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportsComponent } from './pages/reports/reports.component';
import { AddReportsComponent } from './pages/add-reports/add-reports.component';


@NgModule({
  declarations: [ReportsComponent, AddReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ]
})
export class ReportsModule { }
