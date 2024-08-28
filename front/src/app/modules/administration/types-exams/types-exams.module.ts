import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypesExamsRoutingModule } from './types-exams-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TypesExamsComponent } from './pages/types-exams/types-exams.component';
import { AddTypesExamsComponent } from './pages/add-types-exams/add-types-exams.component';


@NgModule({
  declarations: [ TypesExamsComponent, AddTypesExamsComponent ],
  imports: [
    CommonModule,
    TypesExamsRoutingModule,
    SharedModule
  ]
})
export class TypesExamsModule { }
